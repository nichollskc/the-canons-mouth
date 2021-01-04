#[macro_use]
extern crate cpython;

use std::error::Error;
use std::fs::File;

use cpython::{Python, PyDict, PyResult};
use lazy_static::lazy_static;
use bincode;

use spyglass::SuffixTrie;

const SUFFIXTRIE_PATH: &str = "./canon_tree.sst";
const TEXTS_DIR: &str = "./texts/tokenized/";

lazy_static! {
    static ref TRIE: SuffixTrie = build_or_read_canon_tree(TEXTS_DIR);
}

fn read_canon_tree(filename: &str) -> Result<SuffixTrie, Box<Error>> {
    let file = File::open(filename)?;
    let decoded: SuffixTrie = bincode::deserialize_from(file)?;
    Ok(decoded)
}

fn build_or_read_canon_tree(path: &str) -> SuffixTrie {
    let read_tree = read_canon_tree(SUFFIXTRIE_PATH);
    match read_tree {
        Ok(trie) => trie,
        Err(e) => {
            let mut buffer = File::create(SUFFIXTRIE_PATH).unwrap();
            let trie = SuffixTrie::from_directory(path).unwrap();
            bincode::serialize_into(buffer, &trie);
            trie
        }
    }
}

fn py_find_exact(py: Python, pattern: &str) -> PyResult<PyDict> {
    let mut matches = TRIE.find_exact(pattern);
    let text_names = TRIE.get_text_names();
    let py_matches: Vec<PyDict> = matches.iter().enumerate().map(|(i, x)| {
        let (before, matching, after) = TRIE.get_strings_of_match(x, 2);
        let py_match: PyDict = PyDict::new(py);
        py_match.set_item(py, "index_in_str", x.index_in_str).unwrap();
        py_match.set_item(py, "length", x.length).unwrap();
        py_match.set_item(py, "start_line", x.start_line).unwrap();
        py_match.set_item(py, "end_line", x.end_line).unwrap();
        py_match.set_item(py, "errors", x.errors).unwrap();
        py_match.set_item(py, "text_index", x.text_index).unwrap();
        py_match.set_item(py, "text", text_names[x.text_index].clone()).unwrap();
        py_match.set_item(py, "key", format!("match_{}", i)).unwrap();
        py_match.set_item(py, "matching", matching.clone()).unwrap();
        py_match.set_item(py, "before", before.clone()).unwrap();
        py_match.set_item(py, "after", after.clone()).unwrap();
        py_match
    }).collect();
    let result: PyDict = PyDict::new(py);
    result.set_item(py, "matches", py_matches).unwrap();
    result.set_item(py, "num_matches", matches.len()).unwrap();
    Ok(result)
}

py_module_initializer!(suffixtrie, |py, m | {
    m.add(py, "__doc__", "This module is implemented in Rust")?;
    m.add(py, "find_exact", py_fn!(py, py_find_exact(pattern: &str)))?;
    Ok(())
});

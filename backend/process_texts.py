import json
import re

import nltk

def txt_to_text_export(name, txtfile, outfile):
    header = [f"const text_{name} = `\n"]
    footer = ["`\n",
              f"export default text_{name}\n"]

    with open(txtfile, 'r') as f:
        lines = f.readlines()

    kept_lines = trim_txt(lines)

    all_lines = header + kept_lines + footer

    with open(outfile, 'w') as f:
        f.writelines(all_lines)

def trim_txt(lines, commented='####'):
    return [line for line in lines if not line.startswith(commented)]

def write_text_prop_dict_js(config, outfile):
    import_strs = []
    text_array = []

    for text_name, properties in config['texts'].items():
        text_dict = {
            'name': text_name,
            'full_name': properties['full_name'],
            'checkbox_key': f"checkbox_{text_name}",
            'text': f"@@text_{text_name}@@",
            'startsChecked': properties['startsChecked'],
        }
        text_array.append(text_dict)

        import_str = f"import text_{text_name} from './texts/{text_name}.js';"
        import_strs.append(import_str)

    text_array_str = "const texts = " + json_dumps_unquote(text_array, indent=2) + ";"
    full_js = '\n'.join(import_strs) + '\n\n' + \
        text_array_str + '\n\n' + \
        'export default texts;'

    with open(outfile, 'w') as f:
        f.write(full_js)

def json_dumps_unquote(obj, *args, **kwargs):
    """Do JSON dump, but whenever a field is surrounded by '@@' signs, remove
    any quotes from the resulting dump"""
    s = json.dumps(obj, *args, **kwargs)
    s = s.replace('"@@', '')
    s = s.replace('@@"', '')
    return s

def process_txt_for_search(txtfile, outfile):
    with open(txtfile, 'r') as f:
        lines = f.readlines()

    kept_lines = trim_txt(lines)

    with open(outfile, 'w') as f:
        f.writelines(kept_lines)

def extract_chapter_markers(txtfile, chapter_file):
    with open(txtfile, 'r') as f:
        lines = f.readlines()

    chapter_starts = []
    fixed_lines = []

    for line_number, line in enumerate(lines):
        match = re.match(r'<<CHAPTER::(.*)>>', line)
        if match:
            chapter_starts.append([line_number, match[1]])
            line = re.sub(r'<<CHAPTER::.*>>', '', line)

        fixed_lines.append(line)

    with open(chapter_file, 'w') as f:
        json.dump(chapter_starts, f, indent=2)

    return fixed_lines

def add_sentence_breaks(contents, with_breaks):
    sentence_boundaries = nltk.PunktSentenceTokenizer().span_tokenize(contents)

    with open(with_breaks, 'w') as f:
        (last_start, last_end) = next(sentence_boundaries)
        for (start, end) in sentence_boundaries:
            sentence = contents[last_start:start]
            f.write(re.sub(r'(\n\n\s*)', r'\1<<STOP>>', sentence) + "<<STOP>>")
            (last_start, last_end) = (start, end)

        sentence = contents[last_start:]
        f.write(re.sub(r'(\n\n\s*)', r'\1<<STOP>>', sentence))

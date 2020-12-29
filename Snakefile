configfile: "config.yml"

rule download_file:
    output:
        out="texts/raw/{name}.{ext}",
    params:
        url=lambda wildcards: config['texts'][wildcards.name]['urls'][wildcards.ext]
    shell:
        "wget -O {output.out} {params.url}"

rule txt_to_jsx:
    input:
        txt="texts/raw/{name}.txt",
    output:
        js="src/texts/{name}.js"
    run:
        import process_texts as pt
        pt.txt_to_text_export(wildcards.name,
                              input.txt,
                              output.js)

rule txt_to_searchable:
    input:
        txt="texts/raw/{name}.txt",
    output:
        txt="texts/search/{name}.txt",
    run:
        import process_texts as pt
        pt.process_txt_for_search(input.txt, output.txt)

rule text_props_js:
    output:
        js="src/texts.js"
    run:
        import process_texts as pt
        pt.write_text_prop_dict_js(config, output.js)

rule all_js:
    input:
        expand("src/texts/{name}.js",
               name=config['texts'].keys()),
        texts="src/texts.js",

rule all_texts:
    input:
        expand("texts/raw/{name}.{ext}",
               name=config['texts'].keys(),
               ext=['txt', 'html']),
        expand("texts/search/{name}.txt",
               name=config['texts'].keys())

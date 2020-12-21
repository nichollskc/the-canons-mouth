configfile: "config.yml"

rule download_file:
    output:
        out="texts/{name}.{ext}",
    params:
        url=lambda wildcards: config['texts'][wildcards.name]['urls'][wildcards.ext]
    shell:
        "wget -O {output.out} {params.url}"

rule txt_to_jsx:
    input:
        txt="texts/{name}.txt",
    output:
        js="src/texts/{name}.js"
    run:
        import process_texts as pt
        pt.txt_to_text_export(wildcards.name,
                              input.txt,
                              output.js)

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
        expand("texts/{name}.{ext}",
               name=config['texts'].keys(),
               ext=['txt', 'html'])

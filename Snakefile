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
        js="src/{name}.js"
    run:
        import process_texts as pt
        pt.txt_to_jsx_component(wildcards.name,
                                input.txt,
                                output.js)

rule all_texts:
    input:
        expand("texts/{name}.{ext}",
               name=config['texts'].keys(),
               ext=['txt', 'html'])

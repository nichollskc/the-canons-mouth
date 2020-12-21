configfile: "config.yml"

rule download_file:
    output:
        out="texts/{name}.{ext}",
    params:
        url=lambda wildcards: config['texts'][wildcards.name]['urls'][wildcards.ext]
    shell:
        "wget -O {output.out} {params.url}"

rule all_texts:
    input:
        expand("texts/{name}.{ext}",
               name=config['texts'].keys(),
               ext=['txt', 'html'])

def txt_to_jsx_component(name, txtfile, outfile):
    capitalised = name.capitalize()

    header = ["const text = `\n"]
    footer = ["`\n",
              f"const {capitalised} " + "= () => {\n",
               "    return(\n",
              f"<pre id='{name}'>\n",
               "        {text}\n",
               "</pre>\n",
               ");\n",
               "};\n",
              f"export default {capitalised}\n"]

    with open(txtfile, 'r') as f:
        lines = f.readlines()

    kept_lines = trim_txt(lines)

    all_lines = header + kept_lines + footer

    with open(outfile, 'w') as f:
        f.writelines(all_lines)

def trim_txt(lines, commented='####'):
    return [line for line in lines if not line.startswith(commented)]

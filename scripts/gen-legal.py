#!/usr/bin/env python3
"""Converte os textos legais do app (../domo/legal/*.md) em HTML semântico.

Saída: src/app/[locale]/legal/content.generated.ts (não editar à mão; rode de
novo quando o .md do app mudar). Só conversão Markdown -> HTML: nenhuma
palavra do texto é alterada. Ficam de fora: o título H1 (a página renderiza o
próprio), as linhas de versão/status, o bloco de notas internas do início, as
réguas horizontais e o "Aviso de elaboração" do fim (o banner de minuta da
página já cobre isso).
"""
import html, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.environ.get("DOMO_LEGAL_DIR", os.path.join(ROOT, "..", "domo", "legal"))
OUT = os.path.join(ROOT, "src", "app", "[locale]", "legal", "content.generated.ts")
DOCS = {
    "privacy": {"pt": "politica-de-privacidade.md", "en": "privacy-policy.en.md"},
    "terms": {"pt": "termos-de-uso.md", "en": "terms-of-use.en.md"},
}

def inline(t):
    t = html.escape(t, quote=False)
    t = re.sub(r"`([^`]+)`", r"<code>\1</code>", t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?!\w)", r"<em>\1</em>", t)
    t = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", r'<a href="\2" target="_blank" rel="noopener noreferrer">\1</a>', t)
    t = re.sub(r'(?<!["=>])(https?://[^\s<)]+[^\s<).,;])', r'<a href="\1" target="_blank" rel="noopener noreferrer">\1</a>', t)
    return t

def parse_list(lines, i, indent):
    ordered = bool(re.match(r"\s*\d+\.\s", lines[i]))
    tag = "ol" if ordered else "ul"
    out = [f"<{tag}>"]
    pat = re.compile(r"^(\s*)(?:\d+\.|[-*])\s+(.*)$")
    while i < len(lines):
        m = pat.match(lines[i])
        if not m or len(m.group(1)) != indent:
            break
        text = [m.group(2)]
        i += 1
        sub = ""
        while i < len(lines):
            if not lines[i].strip():
                break
            m2 = pat.match(lines[i])
            if m2 and len(m2.group(1)) > indent:
                sub, i = parse_list(lines, i, len(m2.group(1)))
                continue
            if m2 and len(m2.group(1)) <= indent:
                break
            text.append(lines[i].strip())
            i += 1
        out.append("<li>" + inline(" ".join(text)) + sub + "</li>")
    out.append(f"</{tag}>")
    return "".join(out), i

def convert(md):
    lines = md.split("\n")
    # corta o aviso de elaboração final e tudo depois do último "---"
    last_hr = max(k for k, l in enumerate(lines) if l.strip() == "---")
    if any("Aviso de elaboração" in l or "Drafting notice" in l for l in lines[last_hr:]):
        lines = lines[:last_hr]
    # remove tudo até o primeiro "---" (título, versão, status, notas internas)
    first_hr = next(k for k, l in enumerate(lines) if l.strip() == "---")
    lines = lines[first_hr + 1:]
    out, i = [], 0
    while i < len(lines):
        l = lines[i]
        if not l.strip() or l.strip() == "---":
            i += 1
        elif l.startswith("## "):
            out.append(f"<h2>{inline(l[3:].strip())}</h2>"); i += 1
        elif l.startswith("### "):
            out.append(f"<h3>{inline(l[4:].strip())}</h3>"); i += 1
        elif l.lstrip().startswith("|"):
            rows = []
            while i < len(lines) and lines[i].lstrip().startswith("|"):
                rows.append([c.strip() for c in lines[i].strip().strip("|").split("|")]); i += 1
            head, body = rows[0], [r for r in rows[2:]]
            t = "<table><thead><tr>" + "".join(f"<th>{inline(c)}</th>" for c in head) + "</tr></thead><tbody>"
            for r in body:
                t += "<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>"
            out.append(t + "</tbody></table>")
        elif re.match(r"^(\d+\.|[-*])\s", l):
            s, i = parse_list(lines, i, 0); out.append(s)
        elif l.startswith(">"):
            buf = []
            while i < len(lines) and lines[i].startswith(">"):
                buf.append(lines[i].lstrip("> ").strip()); i += 1
            out.append("<aside class=\"legal-pending\"><p>" + inline(" ".join(buf)) + "</p></aside>")
        else:
            buf = []
            while i < len(lines) and lines[i].strip() and not re.match(r"^(#|\||>|(\d+\.|[-*])\s)", lines[i]) and lines[i].strip() != "---":
                buf.append(lines[i].strip()); i += 1
            out.append("<p>" + inline(" ".join(buf)) + "</p>")
    return "\n".join(out)

def meta(md):
    ver = re.search(r"\*\*(?:Versão|Version) ([\d.]+)", md).group(1)
    return ver

data, version = {}, None
for doc, langs in DOCS.items():
    data[doc] = {}
    for lang, fn in langs.items():
        md = open(os.path.join(SRC, fn), encoding="utf-8").read()
        data[doc][lang] = convert(md)
        v = meta(md)
        version = version or v
        if v != version:
            sys.exit(f"versões diferentes: {fn} é {v}, esperado {version}")

with open(OUT, "w", encoding="utf-8") as f:
    f.write("// GERADO por scripts/gen-legal.py a partir de ../domo/legal/*.md — não editar à mão.\n")
    f.write(f'export const LEGAL_SOURCE_VERSION = "{version}";\n\n')
    f.write("export const LEGAL_CONTENT: Record<\"privacy\" | \"terms\", Record<\"pt\" | \"en\", string>> = ")
    f.write(json.dumps(data, ensure_ascii=False, indent=2) + ";\n")
print("ok, versão", version)

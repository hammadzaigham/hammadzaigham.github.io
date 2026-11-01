/** Build-time renderer for the commands used by CV.tex. Unknown commands fail the
 * build, preventing CV edits from silently disappearing from the rendered page. */
const escape = (text: string) => text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);

export function renderCV(source: string): string {
  const body = source.match(/\\begin\{document\}([\s\S]*?)\\end\{document\}/)?.[1];
  if (!body) throw new Error('CV.tex must contain a document environment.');
  const input = body.replace(/(?<!\\)%[^\n]*/g, '').replace(/\r/g, '');
  let position = 0;
  const listStack: { tag: string; itemOpen: boolean }[] = [];
  function group(): string {
    while (/\s/.test(input[position] ?? '') && position < input.length) position++;
    if (input[position] !== '{') throw new Error('Expected a TeX argument at ' + position);
    const start = ++position;
    let depth = 1;
    while (position < input.length && depth > 0) {
      if (input[position] === '\\') { position += 2; continue; }
      if (input[position] === '{') depth++;
      if (input[position] === '}') depth--;
      position++;
    }
    if (depth) throw new Error('Unclosed argument in CV.tex');
    return input.slice(start, position - 1);
  }
  function optional(): void {
    if (input[position] === '[') {
      const end = input.indexOf(']', position);
      if (end < 0) throw new Error('Unclosed optional argument in CV.tex');
      position = end + 1;
    }
  }
  // Render a nested formatting argument using the same restricted renderer.
  function inline(text: string): string {
    return renderCV('\\begin{document}' + text + '\\end{document}');
  }
  let html = '';
  while (position < input.length) {
    const char = input[position++];
    if (char === '$' || char === '{' || char === '}') continue;
    if (char !== '\\') { html += escape(char); continue; }
    const next = input[position];
    if (next === '\\') { position++; optional(); html += '<br />'; continue; }
    if (next && '%&_#'.includes(next)) { position++; html += escape(next); continue; }
    const match = input.slice(position).match(/^[A-Za-z]+/);
    if (!match) throw new Error('Unsupported TeX escape at ' + position);
    const command = match[0]; position += command.length;
    switch (command) {
      case 'begin': {
        const environment = group();
        if (environment === 'center') html += '<header class="cv-heading">';
        else if (environment === 'itemize' || environment === 'enumerate') {
          const tag = environment === 'itemize' ? 'ul' : 'ol';
          listStack.push({ tag, itemOpen: false }); html += '<' + tag + '>';
        } else throw new Error('Unsupported CV environment: ' + environment);
        break;
      }
      case 'end': {
        const environment = group();
        if (environment === 'center') html += '</header>';
        else {
          const list = listStack.pop();
          const tag = environment === 'itemize' ? 'ul' : environment === 'enumerate' ? 'ol' : '';
          if (!list || list.tag !== tag) throw new Error('Mismatched CV list environment');
          html += (list.itemOpen ? '</li>' : '') + '</' + list.tag + '>';
        }
        break;
      }
      case 'item': {
        const list = listStack.at(-1);
        if (!list) throw new Error('CV list item outside a list');
        html += (list.itemOpen ? '</li>' : '') + '<li>'; list.itemOpen = true;
        break;
      }
      case 'textbf': html += '<strong>' + inline(group()) + '</strong>'; break;
      case 'textit': case 'emph': html += '<em>' + inline(group()) + '</em>'; break;
      case 'href': {
        const url = group();
        if (!/^(https:\/\/|mailto:)/.test(url)) throw new Error('Unsupported CV link: ' + url);
        html += '<a href="' + escape(url) + '">' + inline(group()) + '</a>'; break;
      }
      case 'cvsection': html += '<h2>' + inline(group()) + '</h2>'; break;
      case 'entryheading': {
        const organization = inline(group()), location = inline(group()), role = inline(group()), period = inline(group());
        html += '<div class="cv-entry-heading"><h3>' + organization + '</h3><span>' + location + '</span></div><div class="cv-entry-heading cv-entry-role"><span>' + role + '</span><span>' + period + '</span></div>'; break;
      }
      case 'subentry': html += '<div class="cv-entry-heading"><h3>' + inline(group()) + '</h3><span>' + inline(group()) + '</span></div>'; break;
      case 'researchtopic': html += '<p class="cv-topic">' + inline(group()) + '</p>'; break;
      case 'par': html += '<br />'; break;
      case 'quad': html += ' &nbsp; '; break;
      case 'hfill': html += '<span class="cv-hfill" aria-hidden="true"></span>'; break;
      case 'vert': html += '|'; break;
      case 'times': html += '×'; break;
      case 'LaTeX': html += 'LaTeX'; break;
      case 'vspace': case 'Needspace': group(); break;
      case 'LARGE': case 'noindent': break;
      default: throw new Error('Unsupported command in CV.tex: \\' + command);
    }
  }
  if (listStack.length) throw new Error('Unclosed list in CV.tex');
  html = html.replace(/---/g, '—').replace(/--/g, '–').replace(/``/g, '“').replace(/&#39;&#39;/g, '”');
  return /\\cvsection\b/.test(input) ? formatDocument(html) : html;
}

/** Give TeX prose real paragraphs rather than anonymous blocks and stray breaks. */
function formatDocument(html: string): string {
  let result = '', prose = '', block = '', depth = 0;
  const blocks = new Set(['header', 'div', 'p', 'ul', 'ol', 'li', 'h1', 'h2', 'h3']);
  const flushProse = () => {
    for (const paragraph of prose.split(/(?:\s*<br\s*\/>\s*)+/)) {
      if (paragraph.trim()) {
        const parts = paragraph.split('<span class="cv-hfill" aria-hidden="true"></span>');
        result += parts.length > 1
          ? '<p class="cv-paragraph cv-balanced-line">' + parts.map(part => '<span>' + part.trim() + '</span>').join('') + '</p>'
          : '<p class="cv-paragraph">' + paragraph.trim() + '</p>';
      }
    }
    prose = '';
  };
  for (const token of html.match(/<[^>]+>|[^<]+/g) ?? []) {
    const tag = token.match(/^<(\/?)([a-z0-9]+)/i);
    const structural = tag && blocks.has(tag[2]);
    if (structural && !tag[1]) {
      if (depth === 0) flushProse();
      depth++;
    }
    if (depth > 0) block += token;
    else prose += token;
    if (structural && tag[1]) {
      depth--;
      if (depth === 0) { result += block; block = ''; }
    }
  }
  flushProse();
  return result.replace(/(<header class="cv-heading">[\s\S]*?<br\s*\/>)([\s\S]*?)(<\/header>)/, (_, heading: string, contact: string, end: string) => {
    const items = contact.split('|').map(item => item.replace(/&nbsp;/g, ' ').trim()).filter(Boolean);
    return heading.replace(/<br\s*\/>$/, '') + '<div class="cv-contact">' + items.map(item => '<span>' + item + '</span>').join('') + '</div>' + end;
  });
}

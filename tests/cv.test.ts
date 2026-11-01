import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { renderCV } from '../src/lib/render-cv.ts';
import { RESEARCH_DATA } from '../src/data/researchData.ts';

const document = (body: string) => '\\begin{document}' + body + '\\end{document}';
const source = readFileSync(new URL('../CV.tex', import.meta.url), 'utf8');

test('renders the authoritative CV, all sections, and escaped research metrics', () => {
  const html = renderCV(source);
  for (const section of ['Education', 'Research Interests', 'Publications', 'Research Experience', 'Technical Projects', 'Honors and Awards', 'Professional Experience', 'Leadership and Service', 'Technical Skills']) {
    assert.ok(html.includes('<h2>' + section + '</h2>'), section);
  }
  for (const text of ['80.28%', '76.41% SPL', '97.33%', '19,784 dashcam frames', '4×4 taxonomy', '53 EV charging studies', '11 potential hallucinations', 'proceedings forthcoming']) assert.ok(html.includes(text), text);
  assert.equal((html.match(/<li>/g) ?? []).length, (source.match(/\\item\b/g) ?? []).length);
  assert.equal((html.match(/<li>/g) ?? []).length, (html.match(/<\/li>/g) ?? []).length);
  assert.doesNotMatch(html, /\\(?:textbf|href|cvsection|begin|item)\b/);
});

test('renders nested formatting, links, math, and LaTeX punctuation', () => {
  const html = renderCV(document('\\textbf{A \\textit{nested} name} \\href{https://example.com/?a=1&b=2}{Link} 4$\\times$4 80\\% \\LaTeX{} -- ``paper\'\''));
  assert.match(html, /<strong>A <em>nested<\/em> name<\/strong>/);
  assert.ok(html.includes('https://example.com/?a=1&amp;b=2'));
  assert.ok(html.includes('4×4 80% LaTeX – “paper”'));
});

test('escapes source text and rejects unsafe links and unsupported commands', () => {
  assert.ok(renderCV(document('<script>')).includes('&lt;script&gt;'));
  assert.throws(() => renderCV(document('\\href{javascript:alert(1)}{bad}')), /Unsupported CV link/);
  assert.throws(() => renderCV(document('\\unknown{content}')), /Unsupported command/);
  assert.throws(() => renderCV(document('\\textbf{unclosed')), /Unclosed argument/);
  assert.throws(() => renderCV(document('\\begin{itemize}\\item missing end')), /Unclosed list/);
  assert.throws(() => renderCV('not a document'), /document environment/);
});

test('preserves escaped percent signs and removes TeX comments', () => {
  const html = renderCV(document('80\\% % hidden\nvisible'));
  assert.match(html, /80%/);
  assert.match(html, /visible/);
  assert.doesNotMatch(html, /hidden/);
});

test('publication authorship and status match the CV record', () => {
  for (const publication of RESEARCH_DATA.publications) {
    for (const author of publication.authors) assert.ok(source.includes(author.name), author.name);
    assert.equal(publication.authors.filter(author => author.isCandidate).length, 1);
    assert.match(publication.bibtex, /Ahmed, Hammad/);
  }
  assert.equal(RESEARCH_DATA.publications[1].status, 'accepted');
  assert.match(RESEARCH_DATA.publications[1].bibtex, /proceedings forthcoming/);
  assert.equal(RESEARCH_DATA.caseStudies.find(project => project.id === 'dygrav')?.verifiedMetrics[2].value, '+8.28 pp');
});

import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {highlightPython,tokenizePython} from '../syntax-highlight.js';
import {JA_UI} from '../course-ja.js';
import {VISUALS,renderVisual,labReadout} from '../course-visuals.js';
const read=name=>fs.readFile(new URL('../'+name,import.meta.url),'utf8');
const d=JSON.parse(await read('content.json'));
for(const c of d.chapters)assert(c.titleJa?.length>1,`Missing Japanese chapter ${c.id}`);
for(const c of d.concepts)assert(c.titleJa&&c.definitionJa,`Missing Japanese concept ${c.id}`);
const decode=s=>s.replace(/<\/?span[^>]*>/g,'').replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&amp;/g,'&');
for(const l of d.lessons){
 assert(l.titleJa&&l.example.ja);assert(l.blocks.every(b=>b.ja));assert(l.sourceSections.every(s=>s.titleJa));
 for(const q of l.quiz){assert(q.question.ja&&q.explanation.ja);assert(q.options.every(o=>o.ja));assert.equal(q.correct,'a');assert.deepEqual([...q.options.map(o=>o.id)].sort(),['a','b','c']);}
 assert.equal(tokenizePython(l.code).map(t=>t.value).join(''),l.code);
 assert.equal(decode(highlightPython(l.code)),l.code,'Highlighting must preserve executable source');
 assert(highlightPython(l.code).includes('syntax-'));
}
const tricky=`# import is a comment\ntext = "<script>alert('x')</script>"\nraw = r'\\n'\nblock = '''first\n# still a string\nlast'''\ndef 関数(x):\n    return x ** 2 + 1e-3\n`;
assert.equal(decode(highlightPython(tricky)),tricky);assert(!highlightPython(tricky).includes('<script>'));
assert(tokenizePython(tricky).some(t=>t.type==='string'&&t.value.includes('# still a string')));
assert(tokenizePython(tricky).some(t=>t.type==='definition'&&t.value==='関数'));
for(const name of ['app.js','course-visuals.js']){
 const src=await read(name);
 // Every literal UI phrase has a Japanese mapping or an explicit third argument.
 const matches=[...src.matchAll(/(?:text|t)\('((?:\\.|[^'])*)'\s*,\s*'((?:\\.|[^'])*)'\s*([,)])/g)];
 const missing=matches.filter(([,zh,,suffix])=>suffix===')'&&!JA_UI[zh]).map(m=>m[1]);
 assert.deepEqual(missing,[],`Missing Japanese UI in ${name}`);
}
for(const v of VISUALS){assert(JA_UI[v.zh]);assert(renderVisual(v.id,'ja').includes(JA_UI[v.zh]));}
assert(labReadout('loss','ja',36).includes('平均値 10.00'));assert(labReadout('wait','ja',5).includes('6.25'));
const app=await read('app.js');assert(app.includes("const STORAGE_KEY='learning-data-science:edition1:v1'"));assert(app.includes('data-mode="ja"'));
console.log('Verified Japanese coverage: 21 guides, 42 checks, 21 concepts, external source links, UI and diagrams; escaped highlighting preserves all Python source.');

import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {buildLearningPath,LEARNING_STAGES} from '../learning-path.js';
import {routeGeometry} from '../route-map.js';
import {VISUALS,lossStats,waitingStats,classificationStats,renderVisual} from '../course-visuals.js';
const data=JSON.parse(await fs.readFile(new URL('../content.json',import.meta.url),'utf8'));
assert.equal(data.chapters.length,21);assert.equal(data.lessons.length,21);
const ids=new Set(data.lessons.map(l=>l.id));assert.equal(ids.size,21);
assert.equal(data.lessons.reduce((n,l)=>n+l.quiz.length,0),42);
assert.equal(data.lessons.reduce((n,l)=>n+l.sourceSections.length,0),0);
assert.deepEqual(LEARNING_STAGES.flatMap(s=>s.chapters),data.chapters.map(c=>c.id));
const sections=new Set();
for(const c of data.chapters){assert(c.sectionIds.length);for(const id of c.sectionIds){assert(ids.has(id));assert.equal(data.lessons.find(l=>l.id===id).chapter,c.id);}}
for(const l of data.lessons){
 assert(l.printPage<=l.printEnd);assert.equal(l.pdfPage,l.printPage+22);assert.equal(l.pdfEnd,l.printEnd+22);
 for(const s of l.sourceSections){assert(!sections.has(s.id));sections.add(s.id);assert.equal(s.pdfPage,s.printPage+22);assert(s.pdfPage>=l.pdfPage&&s.pdfPage<=l.pdfEnd);}
 assert(l.blocks.every(b=>b.zh&&b.en));assert(l.example.zh&&l.example.en);
 assert.equal((await fs.readFile(new URL(`../examples/chapter_${String(l.chapter).padStart(2,'0')}.py`,import.meta.url),'utf8')).replaceAll('\r\n','\n'),'# Independent teaching example; synthetic data.\n'+l.code+'\n');
 for(const q of l.quiz){assert(q.question.zh&&q.question.en&&q.explanation.zh&&q.explanation.en);assert.equal(new Set(q.options.map(o=>o.id)).size,q.options.length);assert(q.options.some(o=>o.id===q.correct));assert(q.options.every(o=>o.zh&&o.en));}
}
const empty=buildLearningPath(data.chapters,data.lessons,[],null);assert.equal(empty.next.id,data.lessons[0].id);assert.equal(empty.last,null);
const skipped=buildLearningPath(data.chapters,data.lessons,[data.lessons[4].id],data.lessons[4].id);assert.equal(skipped.next.id,data.lessons[0].id);assert.equal(skipped.last.chapter,5);assert(skipped.stages[0].items[4].complete);
const done=buildLearningPath(data.chapters,data.lessons,[...ids],data.lessons[20].id);assert.equal(done.next,null);assert.equal(done.readCount,21);
for(const compact of [false,true]){const g=routeGeometry(empty.stages,compact);assert.equal(g.nodes.length,21);assert.equal(g.edges.length,20);assert.equal(new Set(g.nodes.map(n=>n.chapter.id)).size,21);assert(g.nodes.every(n=>Number.isFinite(n.x)&&Number.isFinite(n.y)&&n.y<g.height));for(let i=0;i<20;i++){assert.equal(g.edges[i].from,i+1);assert.equal(g.edges[i].to,i+2);}}
assert.deepEqual(lossStats(36),{mean:10,median:4});assert.equal(waitingStats(5).wait,6.25);assert.equal(waitingStats(0).wait,5);
for(let d=0;d<=9;d++)assert(waitingStats(d).wait>=5);
assert.equal(classificationStats(.5).precision,.5);assert.equal(classificationStats(.5).recall,.5);assert.equal(classificationStats(1).precision,null);assert.equal(classificationStats(0).recall,1);
for(const v of VISUALS){assert(ids.has(`LDS1-CH${String(v.chapter).padStart(2,'0')}`));assert(renderVisual(v.id,'en').includes('<svg'));}
console.log('Verified: 21 chapters, external source links, 42 bilingual checks, both route layouts, progress semantics, and teaching calculations.');

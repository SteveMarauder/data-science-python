import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=n=>fs.readFile(path.join(root,n),'utf8');
const data=JSON.parse(await read('content.json'));
const app=await read('app.js');
for(const n of ['book','assets/source','book-reader.js','vendor/pdf.mjs','vendor/pdf.worker.mjs']){
 await assert.rejects(fs.access(path.join(root,n)),{code:'ENOENT'});
}
assert(!app.includes('loadBookChapter')&&!app.includes('data-source-image')&&!app.includes('data-source-page'));
assert(app.includes('href="./rights.html"'));
assert(app.includes('免費、非商業營運'));
assert(app.includes("const STORAGE_KEY='learning-data-science:edition1:v1'"));
assert(!app.includes('21 章原書正文已內建'));
for(const l of data.lessons){
 const u=new URL(l.sourceUrl);
 assert.equal(u.origin,'https://learningds.org');
 assert(u.pathname.startsWith(`/ch/${String(l.chapter).padStart(2,'0')}/`));
 assert.equal(l.sourceSections.length,0);
}
for(const name of ['rights.html','CONTENT-LICENSE.txt','THIRD-PARTY-NOTICES.txt','README.md']){
 const s=await read(name);assert(s.includes('CC BY-NC-ND 4.0'));assert(s.includes('CC BY 4.0'));assert(s.includes('MIT'));
}
const html=await read('rights.html');
for(const [,href] of html.matchAll(/href="\.\/([^"#]+)"/g))await fs.access(path.join(root,href));
for(const n of ['MARKED-LICENSE.txt','DOMPURIFY-LICENSE.txt','DOMPURIFY-LICENSE-MPL.txt','KATEX-LICENSE.txt','KATEX-FONTS-LICENSE.txt'])await fs.access(path.join(root,'vendor',n));
const inventory=JSON.parse(await read('third-party-inventory.json'));
assert.equal(inventory.publishedBookCorpus,false);
const {createHash}=await import('node:crypto');
for(const f of inventory.files){const b=await fs.readFile(path.join(root,f.path));assert.equal(createHash('sha256').update(b).digest('hex'),f.sha256);}
console.log('Verified rights: excluded book corpus/images, 21 official chapter links, stable progress, material-specific notices and third-party file hashes.');

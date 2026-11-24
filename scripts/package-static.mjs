import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.resolve(root,'dist');
for(const excluded of ['book','assets/source']){try{await fs.access(path.join(root,excluded));throw new Error('Excluded book material present: '+excluded);}catch(e){if(e.code!=='ENOENT')throw e;}}
if(path.dirname(output)!==root||path.basename(output)!=='dist')throw new Error('Invalid build output path');
await fs.rm(output,{recursive:true,force:true});
await fs.mkdir(output,{recursive:true});
const directories=new Set(['assets','locales','translations','vendor','examples']);
for(const entry of await fs.readdir(root,{withFileTypes:true})){
 if(entry.isSymbolicLink())continue;
 if(entry.isDirectory()&&directories.has(entry.name))await fs.cp(path.join(root,entry.name),path.join(output,entry.name),{recursive:true});
 if(entry.isFile()&&(/\.(?:html|css|js|json)$/.test(entry.name)||['.nojekyll','LICENSE','CONTENT-LICENSE.txt','THIRD-PARTY-NOTICES.txt'].includes(entry.name)))await fs.copyFile(path.join(root,entry.name),path.join(output,entry.name));
}
console.log('Static application prepared in dist/.');

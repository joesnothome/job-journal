import {cp,mkdir,rm,readFile,readdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
await rm('dist',{recursive:true,force:true});await mkdir('dist');await cp('public','dist',{recursive:true});await cp('src','dist/src',{recursive:true});
const hash=createHash('sha256');
for(const dir of ['public','src'])for(const f of (await readdir(dir)).sort())hash.update(await readFile(`${dir}/${f}`));
const sw=await readFile('dist/sw.js','utf8');await writeFile('dist/sw.js',sw.replace("const CACHE='job-journal-v2'",`const CACHE='job-journal-${hash.digest('hex').slice(0,12)}'`));

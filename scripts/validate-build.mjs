import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
const root = new URL('../dist/', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
async function files(d) { return (await Promise.all((await readdir(d)).map(async n => { const p=join(d,n); return (await stat(p)).isDirectory() ? files(p) : p; }))).flat(); }
const all=await files(root), html=all.filter(x=>x.endsWith('.html'));
const routes=new Set(html.map(x=>{const r=relative(root,x).replaceAll('\\','/');return r==='index.html'?'/' : '/'+r.replace(/index\.html$/,'');}));
const broken=[];
for(const f of html){const s=await readFile(f,'utf8');for(const m of s.matchAll(/href="(\/[^\"]*)"/g)){const p=m[1].split(/[?#]/)[0];if(p.endsWith('/')&&!routes.has(p))broken.push(`${relative(root,f)} -> ${p}`);}}
if(broken.length)throw Error(`Broken internal links:\n${broken.join('\n')}`);
for(const name of ['robots.txt','sitemap-index.xml','favicon.svg','site.webmanifest'])if(!all.some(x=>x.endsWith(name)))throw Error(`Missing ${name}`);
const text=(await Promise.all(all.filter(x=>/\.(html|js|css|txt)$/.test(x)).map(x=>readFile(x,'utf8')))).join('\n');
for(const bad of ['pub-000000','Lorem ipsum','Coming Soon'])if(text.includes(bad))throw Error(`Forbidden placeholder: ${bad}`);
const normal=[...routes].filter(r=>r!=='/404.html'&&!r.includes('.html'));
for(const r of normal){if(!r.startsWith('/zh/')&&!routes.has(`/zh${r==='/'?'/':r}`))throw Error(`Missing Chinese route for ${r}`);if(r.startsWith('/zh/')&&!routes.has(r.slice(3)||'/'))throw Error(`Missing English route for ${r}`);}
for(const f of html.filter(x=>!x.endsWith('404.html'))){const s=await readFile(f,'utf8');const r='/'+relative(root,f).replaceAll('\\','/').replace(/index\.html$/,'');const path=r==='/'?'/':r;const lang=path.startsWith('/zh/')?'zh-Hans':'en';const canonical=`https://embedded-engineering-toolkit.pages.dev${path}`;if(!s.includes(`<html lang="${lang}">`))throw Error(`Wrong language on ${relative(root,f)}`);if(!s.includes(`<link rel="canonical" href="${canonical}">`))throw Error(`Wrong canonical on ${relative(root,f)}`);if(!s.includes('hreflang="en"')||!s.includes('hreflang="zh-Hans"'))throw Error(`Missing hreflang on ${relative(root,f)}`);if(!s.includes('简体中文')&&!s.includes('English'))throw Error(`Missing language switch on ${relative(root,f)}`);}
console.log(`Validated ${html.length} HTML pages and ${all.length} build files; bilingual routes and internal links are intact.`);

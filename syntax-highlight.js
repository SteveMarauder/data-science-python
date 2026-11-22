// Local, dependency-free Python lexical highlighting. Output is always escaped.
const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const keywords=new Set('False None True and as assert async await break case class continue def del elif else except finally for from global if import in is lambda match nonlocal not or pass raise return try while with yield'.split(' '));
const builtins=new Set('abs all any bool bytes callable chr dict enumerate filter float format frozenset getattr hasattr hash hex int isinstance issubclass iter len list map max min next object open ord pow print range repr reversed round set slice sorted str sum super tuple type zip __import__'.split(' '));
export function tokenizePython(source){
 const tokens=[];let i=0,expectName=false;
 const add=(type,value)=>tokens.push({type,value});
 while(i<source.length){
  const rest=source.slice(i);let match;
  if((match=/^\s+/.exec(rest))){add('plain',match[0]);i+=match[0].length;continue;}
  if(rest[0]==='#'){const end=source.indexOf('\n',i);const value=source.slice(i,end<0?source.length:end);add('comment',value);i+=value.length;continue;}
  const start=/^(?:[rRuUbBfF]{1,2})?(?:"""|'''|"|')/.exec(rest);
  if(start){const marker=start[0].endsWith('"""')?'"""':start[0].endsWith("'''")?"'''":start[0].at(-1);let end=i+start[0].length;
   while(end<source.length){if(source[end]==='\\'){end=Math.min(source.length,end+2);continue;}if(source.startsWith(marker,end)){end+=marker.length;break;}if(marker.length===1&&source[end]==='\n')break;end++;}
   add('string',source.slice(i,end));i=end;expectName=false;continue;
  }
  if((match=/^(?:0[xX][\da-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|(?:\d[\d_]*(?:\.[\d_]*)?|\.\d[\d_]*)(?:[eE][+-]?[\d_]+)?)[jJ]?/.exec(rest))){add('number',match[0]);i+=match[0].length;expectName=false;continue;}
  if((match=/^[\p{L}_][\p{L}\p{N}_]*/u.exec(rest))){const word=match[0];const type=keywords.has(word)?'keyword':expectName?'definition':builtins.has(word)?'builtin':/^\s*\(/.test(rest.slice(word.length))?'function':'plain';add(type,word);expectName=word==='def'||word==='class';i+=word.length;continue;}
  if((match=/^(?:\*\*|\/\/|==|!=|<=|>=|:=|->|[+\-*/%=<>!&|^~@])/.exec(rest))){add('operator',match[0]);i+=match[0].length;continue;}
  add('plain',source[i++]);
 }
 return tokens;
}
export function highlightPython(source){return tokenizePython(String(source)).map(t=>t.type==='plain'?escapeHtml(t.value):`<span class="syntax-${t.type}">${escapeHtml(t.value)}</span>`).join('');}

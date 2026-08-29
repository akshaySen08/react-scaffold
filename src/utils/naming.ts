import path from 'node:path';
function normalizedWords(value:string):string[]{return value.trim().replace(/([a-z0-9])([A-Z])/g,'$1 $2').replace(/[^A-Za-z0-9]+/g,' ').trim().split(/\s+/).filter(Boolean)}
export function validateName(value:string):void {const ws=normalizedWords(value);if(!value.trim()||path.isAbsolute(value)||value==='.'||value==='..'||value.includes('..')||/[\\/\0]/.test(value)||!ws.length||!/^[A-Za-z]/.test(ws[0]!)) throw new Error(`Invalid name "${value}": use words that normalize to a TypeScript identifier starting with a letter; paths and traversal are not allowed.`)}
function words(input:string):string[]{validateName(input);return normalizedWords(input).map(x=>x.toLowerCase())}
export const kebabCase=(v:string)=>words(v).join('-');
export const pascalCase=(v:string)=>words(v).map(x=>x[0]!.toUpperCase()+x.slice(1)).join('');
export const camelCase=(v:string)=>{const p=pascalCase(v);return p[0]!.toLowerCase()+p.slice(1)};
export const hookName=(v:string)=>{const ws=words(v);if(ws[0]==='use')ws.shift();return `use${ws.map(x=>x[0]!.toUpperCase()+x.slice(1)).join('')}`};
export const pageName=(v:string)=>{const p=pascalCase(v);return p.endsWith('Page')?p:`${p}Page`};
export function singularize(v:string):string {const k=kebabCase(v);if(k.endsWith('ies')&&k.length>3)return `${k.slice(0,-3)}y`;if(k.endsWith('sses'))return k.slice(0,-2);if(k.endsWith('s')&&!k.endsWith('ss'))return k.slice(0,-1);return k}

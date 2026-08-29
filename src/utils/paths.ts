import path from 'node:path';
export function safeJoin(root:string,...parts:string[]):string{const base=path.resolve(root);const result=path.resolve(base,...parts);if(result!==base&&!result.startsWith(`${base}${path.sep}`))throw new Error(`Destination escapes project root: ${result}`);return result}
export const displayPath=(root:string,file:string)=>path.relative(root,file).split(path.sep).join('/');

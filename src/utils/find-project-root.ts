import fs from 'node:fs/promises';import path from 'node:path';
export async function findProjectRoot(start=process.cwd()):Promise<string>{let dir=path.resolve(start);while(true){try{await fs.access(path.join(dir,'package.json'));return dir}catch{}const parent=path.dirname(dir);if(parent===dir)throw new Error(`No package.json found from ${path.resolve(start)} upward.`);dir=parent}}

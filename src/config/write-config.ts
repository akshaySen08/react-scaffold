import fs from 'node:fs/promises';import path from 'node:path';import type {ScaffoldConfig} from './config.types.js';
export async function writeConfig(root:string,config:ScaffoldConfig):Promise<string>{const target=path.join(root,'.react-scaffold.json');await fs.writeFile(target,`${JSON.stringify(config,null,2)}\n`,'utf8');return target}

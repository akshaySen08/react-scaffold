import fs from 'node:fs/promises';import path from 'node:path';import type {ScaffoldConfig} from './config.types.js';
export class ConfigExistsError extends Error{constructor(public path:string){super(`.react-scaffold.json already exists. Use --force to replace it.`)}}
export async function ensureConfigWritable(root:string,force=false):Promise<string>{const target=path.join(root,'.react-scaffold.json');if(!force){try{await fs.access(target);throw new ConfigExistsError(target)}catch(e){if((e as NodeJS.ErrnoException).code!=='ENOENT')throw e}}return target}
export async function writeConfig(root:string,config:ScaffoldConfig,force=false):Promise<string>{const target=await ensureConfigWritable(root,force);await fs.writeFile(target,`${JSON.stringify(config,null,2)}\n`,'utf8');return target}

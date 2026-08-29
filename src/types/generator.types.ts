export interface PlannedFile { path:string; content:string }
export interface GenerationPlan { root:string; files:PlannedFile[]; remove?:string[] }
export interface GenerateResult { files:string[]; warnings:string[] }
export interface BaseOptions { root:string; force?:boolean }

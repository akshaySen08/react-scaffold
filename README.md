# react-scaffold-cli

A safe, opinionated CLI for scalable, feature-based **React + TypeScript + Vite-style** projects. It creates features, pages, components, hooks, and types, with optional dependency-free API/schema placeholders, CSS Modules, and supported test boilerplate. Requires Node.js 20+.

## Install and develop

```bash
npm install
npm run typecheck
npm test
npm run build
npm link                 # exposes `react-scaffold` locally
react-scaffold --help
```

After publication, use `npm install -D react-scaffold-cli` or `npx react-scaffold-cli feature`. The npm package name is temporary: check availability and choose a scoped name before publishing if needed.

## Commands

Run commands inside a React project. Missing information is prompted interactively.

```bash
react-scaffold init
react-scaffold feature [name] [--folders api,components,hooks,schemas,types] [--component Name] [--hook name] [--type Name] [--api] [--schema]
react-scaffold page [name] [--css] [--test]
react-scaffold component [name] [--feature name | --ui | --layout] [--css] [--test]
react-scaffold hook [name] [--feature name | --shared]
react-scaffold type [name] [--feature name | --shared]
```

Every generation command accepts `--cwd <path>` and `--force`. Examples:

```bash
react-scaffold feature tasks
react-scaffold page Tasks --css --test
react-scaffold component TaskCard --feature tasks --css
react-scaffold hook useTasks --feature tasks
react-scaffold hook useDebounce --shared
react-scaffold type Task --feature tasks
react-scaffold type Pagination --shared
react-scaffold feature tasks --cwd apps/web
```

Interactive feature creation recommends all five folders and optionally creates starter files. Component scope and feature selection are prompted when omitted.

## Generated organization

```text
src/
├── features/tasks/
│   ├── api/task-api.ts
│   ├── components/TaskList/
│   │   ├── TaskList.tsx
│   │   └── TaskList.module.css
│   ├── hooks/useTasks.ts
│   ├── schemas/task-schema.ts
│   └── types/task.types.ts
├── pages/tasks/TasksPage.tsx
├── components/{ui,layout}/...
├── hooks/useDebounce.ts
└── types/pagination.types.ts
```

Empty selected feature folders receive `.gitkeep`; generating a real child removes it. Pages always use their own kebab-case directory. Components use PascalCase directories and files. Hooks always normalize to `usePascalCase`. Type filenames are kebab-case and use a deliberately small, predictable singularizer (`tasks` → `task`, `categories` → `category`); irregular English plurals are not inferred.

## Configuration

`react-scaffold init` writes `.react-scaffold.json` at the nearest React package root:

```json
{
  "sourceDir": "src",
  "featuresDir": "src/features",
  "pagesDir": "src/pages",
  "componentsDir": "src/components",
  "hooksDir": "src/hooks",
  "typesDir": "src/types",
  "language": "typescript",
  "styling": "css-modules",
  "namedExports": true,
  "generateTests": false
}
```

Without it, these defaults are used and the CLI explains how to customize them. In monorepos, `--cwd apps/web` starts project-root discovery there. The nearest upward `package.json` must declare React.

## Safety and tests

Names cannot be absolute paths, traversal, or contain separators. Each generator constructs a complete plan and checks all collisions before writing, preventing partial output on validation/collision failures. Nothing is overwritten unless `--force` is explicit. Test files are generated only when a recognizable Vitest/Jest/Testing Library dependency is present; otherwise the CLI warns and skips them.

## Current limitations and roadmap

Version 1 does **not** modify router configuration or existing imports, generate barrel exports, support Next.js or JavaScript, install generated-code dependencies, or provide alternate styling/export strategies. Planned extensions include pluggable frameworks, languages, styling, test adapters, and optional import/router integrations while retaining dry, testable generation plans.

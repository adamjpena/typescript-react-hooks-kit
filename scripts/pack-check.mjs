import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workspace = path.join(
  tmpdir(),
  `typescript-react-hooks-kit-pack-${Date.now()}`,
);
const packDirectory = path.join(workspace, 'pack');
const fixtureDirectory = path.join(workspace, 'fixture');
const cacheDirectory = path.join(workspace, 'npm-cache');
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const run = (command, args, cwd = root) =>
  execFileSync(command, args, {
    cwd,
    encoding: 'utf8',
    env: {
      ...process.env,
      npm_config_cache: cacheDirectory,
    },
  });

const runNpm = (args, cwd = root) => run(npmCommand, args, cwd);

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

mkdirSync(packDirectory, { recursive: true });
mkdirSync(fixtureDirectory, { recursive: true });

try {
  const packOutput = runNpm([
    'pack',
    '--json',
    '--pack-destination',
    packDirectory,
  ]);
  const [packInfo] = JSON.parse(packOutput);
  const packedPaths = packInfo.files.map((file) => file.path);
  const tarballPath = path.join(packDirectory, packInfo.filename);

  const requiredFiles = [
    'CHANGELOG.md',
    'LICENSE',
    'README.md',
    'dist/index.cjs',
    'dist/index.d.ts',
    'dist/index.mjs',
    'dist/hooks/useAsync.cjs',
    'dist/hooks/useAsync.d.ts',
    'dist/hooks/useAsync.mjs',
    'dist/hooks/useWindowSize.cjs',
    'dist/hooks/useWindowSize.d.ts',
    'dist/hooks/useWindowSize.mjs',
    'package.json',
  ];

  for (const requiredFile of requiredFiles) {
    assert(
      packedPaths.includes(requiredFile),
      `Expected ${requiredFile} to be included in the package.`,
    );
  }

  const forbiddenFiles = packedPaths.filter(
    (filePath) =>
      filePath.startsWith('src/') ||
      filePath.startsWith('.github/') ||
      filePath.includes('__tests__') ||
      filePath.endsWith('.tgz') ||
      filePath === 'tsconfig.json' ||
      filePath === 'tsup.config.ts' ||
      filePath === 'vitest.config.ts',
  );

  assert(
    forbiddenFiles.length === 0,
    `Package includes development-only files: ${forbiddenFiles.join(', ')}`,
  );

  writeFileSync(
    path.join(fixtureDirectory, 'package.json'),
    JSON.stringify(
      {
        private: true,
        type: 'module',
        scripts: {
          typecheck: 'tsc --noEmit',
        },
      },
      null,
      2,
    ),
  );

  writeFileSync(
    path.join(fixtureDirectory, 'esm.mjs'),
    [
      "import { useDebounce, useForm, useWindowSize } from 'typescript-react-hooks-kit';",
      "import useMediaQuery from 'typescript-react-hooks-kit/useMediaQuery';",
      '',
      "if (typeof useDebounce !== 'function') throw new Error('Missing root export');",
      "if (typeof useForm !== 'function') throw new Error('Missing useForm export');",
      "if (typeof useWindowSize !== 'function') throw new Error('Missing useWindowSize export');",
      "if (typeof useMediaQuery !== 'function') throw new Error('Missing subpath export');",
      '',
    ].join('\n'),
  );

  writeFileSync(
    path.join(fixtureDirectory, 'cjs.cjs'),
    [
      "const { useDebounce, useForm, useWindowSize } = require('typescript-react-hooks-kit');",
      "const useMediaQuery = require('typescript-react-hooks-kit/useMediaQuery');",
      '',
      "if (typeof useDebounce !== 'function') throw new Error('Missing root export');",
      "if (typeof useForm !== 'function') throw new Error('Missing useForm export');",
      "if (typeof useWindowSize !== 'function') throw new Error('Missing useWindowSize export');",
      "if (typeof useMediaQuery !== 'function') throw new Error('Missing subpath export');",
      '',
    ].join('\n'),
  );

  writeFileSync(
    path.join(fixtureDirectory, 'index.ts'),
    [
      "import { useDebounce, useForm, useWindowSize } from 'typescript-react-hooks-kit';",
      "import useMediaQuery from 'typescript-react-hooks-kit/useMediaQuery';",
      '',
      "const debounced: string = useDebounce('value', 100);",
      "const matches: boolean = useMediaQuery('(min-width: 800px)');",
      "const { values } = useForm({ name: 'Ada', subscribed: false });",
      'const size = useWindowSize();',
      '',
      'values.name satisfies string;',
      'values.subscribed satisfies boolean;',
      'size.width satisfies number;',
      'debounced satisfies string;',
      'matches satisfies boolean;',
      '',
    ].join('\n'),
  );

  writeFileSync(
    path.join(fixtureDirectory, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          strict: true,
          target: 'ES2022',
          module: 'NodeNext',
          moduleResolution: 'NodeNext',
          jsx: 'react-jsx',
          skipLibCheck: false,
        },
        include: ['index.ts'],
      },
      null,
      2,
    ),
  );

  runNpm(
    [
      'install',
      '--ignore-scripts',
      '--no-audit',
      '--no-fund',
      tarballPath,
      'react@19.2.7',
      'react-dom@19.2.7',
      'typescript@7.0.2',
    ],
    fixtureDirectory,
  );

  run(process.execPath, ['esm.mjs'], fixtureDirectory);
  run(process.execPath, ['cjs.cjs'], fixtureDirectory);
  runNpm(['run', 'typecheck'], fixtureDirectory);

  const packageJson = JSON.parse(
    readFileSync(
      path.join(
        fixtureDirectory,
        'node_modules',
        'typescript-react-hooks-kit',
        'package.json',
      ),
      'utf8',
    ),
  );

  assert(
    packageJson.version === packInfo.version,
    `Installed ${packageJson.version}, expected ${packInfo.version}.`,
  );
} finally {
  if (process.env.KEEP_PACK_CHECK_WORKSPACE !== '1') {
    rmSync(workspace, { recursive: true, force: true });
  }
}

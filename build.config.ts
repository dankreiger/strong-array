import type { BuildConfig } from 'bun'

const formats = [
  'cjs',
  'esm',
  'iife',
] as const satisfies readonly BuildConfig['format'][]

// Clean the dist folder
await Bun.$`rm -rf ./dist`

// Build the project in all formats
await Promise.allSettled(
  formats.map((format) =>
    Bun.build({
      entrypoints: ['./src/index.ts'],
      outdir: `./dist/${format}`,
      format,
      sourcemap: 'linked',
      // plugins: [
      //   {
      //     name: 'replace-exports',
      //     setup(build) {
      //       build.onLoad({ filter: /src\/index\.ts/ }, async () => {
      //         if (format === 'iife') {
      //           return {
      //             contents: /* ts */ `import * as StrongArray from './utils';
      //             // check if we are in the browser
      //             if (typeof window !== 'undefined') {
      //               window.StrongArray = StrongArray;
      //             }
      //             export default StrongArray;

      //             `,
      //           }
      //         }
      //       })
      //     },
      //   },
      // ],
    })
      .then((buildOutput) => {
        if (buildOutput.success) return
        console.error('Build failed')
        for (const message of buildOutput.logs) {
          console.error(message)
        }
        process.exit(1)
      })
      .catch(console.error),
  ),
)

// Run tsc to generate types
await Bun.$`bunx tsc --project ./tsconfig.build.json`

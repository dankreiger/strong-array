import type { BuildConfig } from 'bun'

const formats = [
  'cjs',
  'esm',
  'iife',
] as const satisfies readonly BuildConfig['format'][]


await Bun.$`find . -type d -name dist -exec rm -rf {} +`

// Build the project in all formats
await Promise.allSettled(
  formats.map((format) =>
    Bun.build({
      entrypoints: ['./src/index.ts'],
      outdir: `./dist/${format}`,
      format,
      minify: format === 'iife',
      sourcemap: 'linked',
      plugins: [
        {
          name: 'replace-exports',
          setup(build) {
            build.onLoad({ filter: /src\/index\.ts/ }, async () => {
              if (format === 'iife') {
                return {
                  contents: /* ts */ `import { toEnum } from './utils';

                  const publicApi = { toEnum };
                  const isBrowser = typeof window !== 'undefined' && window !== null && typeof window === 'object';

                  // check if we are in the browser
                  if (isBrowser) {
                    window.StrongArray = publicApi;
                  }
                  export default window.StrongArray = publicApi
                  `,
                }
              }
            })
          },
        },
      ],
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

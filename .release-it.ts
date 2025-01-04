import type { Config } from 'release-it'

export default {
  hooks: {
    'after:bump': 'bun run build',
  },
  git: {
    commitMessage: 'chore: release v${version}',
    tagName: 'v${version}',
    push: true,
  },
  github: {
    release: true,
  },
  npm: {
    publish: true,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      infile: 'CHANGELOG.md',
      preset: 'angular',
    },
  },
} as const satisfies Config

// https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule#rule-list
// module.exports = {
export default {
  rules: {
    // https://github.com/textlint/textlint/blob/master/docs/configuring.md#severity-config-of-rules
    'no-todo': {
      severity: 'warning',
    },
    'unexpanded-acronym': {
      // AB is ignore, ABC is recognized.
      min_acronym_len: 3,
      // GREEEEEEN is ignore
      max_acronym_len: 5,
      // OSS is ignore
      ignore_acronyms: ['OSS'],
    },
    rousseau: {
      showLevels: ['suggestion', 'warning', 'error'],
      ignoreTypes: ['sentence:uppercase'],
    },
    'common-misspellings': {
      // Misspellings to be ignored (case-insensitive)
      ignore: ['vue', 'vite', 'vuepress'],
    },
  },
}

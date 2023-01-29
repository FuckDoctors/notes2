// https://github.com/remarkjs/remark-lint/blob/main/.remarkrc.js
// module.exports = {
export default {
  plugins: [
    'remark-preset-lint-recommended',
    'remark-preset-lint-consistent',
    'remark-gfm',
    [
      'remark-github',
      {
        repository: 'FuckDoctors/hello-vue3',
      },
    ],
    'remark-validate-links',
  ],
}

module.exports = {
  customSyntax: 'postcss-html',
  extends: [
    // Enables parsing of vue files. Required since Stylelint 14 (along with postcss-html)
    'stylelint-config-html/vue',
    // Extends both the standard css as well as standard scss configs (includes both packages)
    // 'stylelint-config-standard-scss',
    // Enforce a standard order for CSS properties
    'stylelint-config-hudochenkov/full',
    // Tweaks stylelint rules to accept css modules specific syntax.
    // 'stylelint-config-css-modules',
  ],
}

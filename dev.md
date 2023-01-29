# build tools

```bash
# prettier
pnpm add --save-dev --save-exact prettier
pnpm add --save-dev eslint-config-prettier stylelint-config-prettier stylelint-config-prettier-scss

# stylelint
pnpm add --save-dev stylelint stylelint-config-standard stylelint-config-html stylelint-config-standard-scss stylelint-config-hudochenkov stylelint-order stylelint-scss

# husky
pnpm add -D husky lint-staged
npx husky install

# commitlint
pnpm add -D @commitlint/cli @commitlint/config-conventional

# @commitlint/cz-commitlint
pnpm add -D @commitlint/cz-commitlint commitizen inquirer@8             # inquirer is required as peer dependency

# Next, initialize your project to use the cz-conventional-changelog adapter by typing:
# pnpm
npx commitizen init cz-conventional-changelog --pnpm --save-dev --save-exact

# markdownlint
pnpm add -D markdownlint

# Install textlint and rules into local directory
pnpm add --save-dev textlint textlint-rule-no-todo textlint-rule-common-misspellings textlint-rule-rousseau textlint-rule-unexpanded-acronym
pnpm add -D @textlint/types @textlint/ast-node-types

# remark
pnpm add -D remark-cli remark-toc remark-preset-lint-consistent remark-preset-lint-recommended remark-gfm remark-github remark-validate-links

# postcss
pnpm add -D autoprefixer postcss postcss-html postcss-import postcss-scss @types/postcss-import
# sass
pnpm add -D sass
```

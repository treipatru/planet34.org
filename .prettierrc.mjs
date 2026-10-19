/** @type {import("prettier").Config} */
export default {
   plugins: ['prettier-plugin-astro'],
   "arrowParens": "always",
   "bracketSameLine": false,
   "bracketSpacing": true,
   "semi": true,
   "experimentalTernaries": false,
   "singleQuote": true,
   "jsxSingleQuote": true,
   "quoteProps": "as-needed",
   "trailingComma": "all",
   "singleAttributePerLine": true,
   "htmlWhitespaceSensitivity": "css",
   "vueIndentScriptAndStyle": false,
   "proseWrap": "preserve",
   "insertPragma": false,
   "printWidth": 80,
   "requirePragma": false,
   "tabWidth": 2,
   "useTabs": true,
   "embeddedLanguageFormatting": "auto",
   overrides: [
      {
         files: '*.astro',
         options: {
            parser: 'astro',
         },
      },
   ],
};

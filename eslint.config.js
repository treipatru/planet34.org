import astro from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';

export default [
	...astro.configs.recommended,
	{
		files: ['**/*.astro'],
		languageOptions: {
			parserOptions: {
				parser: tsParser,
				extraFileExtensions: ['.astro'],
			},
		},
		rules: {
			// override/add rules settings here, such as:
			// "astro/no-set-html-directive": "error"
		},
	},
	{ ignores: ['dist/', '.astro/'] },
];

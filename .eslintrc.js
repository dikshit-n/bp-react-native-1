module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
		es2021: true,
		"react-native/react-native": true
	},
	extends: [
		"plugin:react/recommended",
		"prettier",
		"eslint:recommended",
		"plugin:jest/recommended",
		"plugin:@typescript-eslint/recommended", // Add TypeScript ESLint plugin
		"airbnb",
		"airbnb/hooks"
	],
	parser: "@typescript-eslint/parser", // Specify the TypeScript parser
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: "latest",
		sourceType: "module"
	},
	plugins: ["react", "react-native", "detox", "@typescript-eslint"],
	rules: {
		"import/no-cycle": "warn",
		"@typescript-eslint/no-empty-interface": "off",
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"no-console": ["error"],
		"no-unused-vars": "off", // Disable the default rule for unused variables
		"@typescript-eslint/no-unused-vars": ["error", { vars: "all" }], // Enable TypeScript-specific rule for unused variables
		"import/prefer-default-export": "off",
		"react/jsx-filename-extension": [
			1,
			{ extensions: [".js", ".jsx", ".tsx"] }
		],
		"react/react-in-jsx-scope": "off",
		"react/function-component-definition": "off",
		"import/extensions": "off",
		"react-hooks/exhaustive-deps": "warn",
		"class-methods-use-this": "warn",
		"no-tabs": "off",
		"max-len": "off",
		"no-use-before-define": "off",
		"no-param-reassign": "off",
		"no-unused-expressions": "warn",
		"no-async-promise-executor": "off",
		camelcase: "off",
		"react/jsx-props-no-spreading": "warn",
		"react/no-array-index-key": "off",
		"@typescript-eslint/no-unused-vars": "warn",
		"react/destructuring-assignment": "off",
		"react/prop-types": "warn",
		"react/require-default-props": "warn",
		"no-mixed-spaces-and-tabs": "warn",
		"@typescript-eslint/ban-types": "off",
		"import/export": "warn",
		"default-param-last": "off",
		"react/jsx-no-useless-fragment": "warn",
		"@typescript-eslint/no-empty-function": "warn"
	},
	settings: {
		react: {
			version: "detect"
		},
		"import/resolver": {
			typescript: {}
		},
		"import/extensions": [".js", ".jsx", ".ts", ".tsx"]
	},
	ignorePatterns: [
		"**/*.config.js",
		"node_modules",
		"!src/**/*.js",
		"!src/**/*.ts",
		"!src/**/*.jsx",
		"!src/**/*.tsx",
		"!App.tsx",
		".eslintrc.js",
		"__tests__",
		"**/*.test.js",
		"**/*.test.ts",
		"**/*.test.jsx",
		"**/*.test.tsx"
	]
};

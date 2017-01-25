module.exports = {
	"env": {
		"es6": true,
		browser: true,
		node:true
	},
	"extends": ["eslint:recommended", "plugin:react/recommended"],
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"classes": true,
			"jsx": true
		},
		"sourceType": "module",
		"ecmaVersion": 7
	},
	"plugins": [
		"react"
	],
	"rules": {
	"indent": ["error", "tab", { "SwitchCase": 1 }],
	"linebreak-style": [
		"error",
		"unix"
	],
	"quotes": [
		"warn", "single", {
			"avoidEscape": true,
			"allowTemplateLiterals": true
		}
	],
	"semi": [
		"error",
		"always"
	],
	"react/jsx-uses-react": "error",
	"react/jsx-uses-vars": "error",
	"no-console": ["warn", { "allow": ["warn", "error", "info", "group", "groupEnd"] }],
	"no-unused-vars": ["warn", {"vars": "all"}],
	"no-irregular-whitespace": "error",
	"no-multi-spaces": "warn"
	}
}
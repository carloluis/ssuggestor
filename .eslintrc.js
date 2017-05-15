module.exports = {
	"env": {
		"es6": true,
		"browser": true,
		"node": true,
		"jest": true
	},
	"extends": [
		"eslint:recommended", 
		"plugin:react/recommended"
	],
	"parserOptions": {
		"ecmaVersion": 7,
		"sourceType": "module",
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"classes": true,
			"jsx": true
		}
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
		"react/no-find-dom-node": "warn",
		"no-console": ["warn", { "allow": ["warn", "error", "info", "group", "groupEnd"] }],
		"no-unused-vars": ["warn", {"vars": "all"}],
		"no-irregular-whitespace": "error",
		"no-multi-spaces": "warn"
	}
}
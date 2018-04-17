const fs = require('fs');
const { buildExternalHelpers } = require('babel-core');

const code = buildExternalHelpers([
	'classCallCheck',
	'createClass',
	'extends',
	'inherits',
	'interopRequireDefault',
	'possibleConstructorReturn'
]);

fs.writeFileSync('helpers.js', code);

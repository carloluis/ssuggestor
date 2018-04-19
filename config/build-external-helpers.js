const fs = require('fs');
const { buildExternalHelpers } = require('babel-core');

function buildHelpers(filename = 'helpers.js') {
	const code = buildExternalHelpers([
		'classCallCheck',
		'createClass',
		'extends',
		'inherits',
		'interopRequireDefault',
		'possibleConstructorReturn'
	]);

	fs.writeFileSync(filename, code);
}

module.exports = buildHelpers;

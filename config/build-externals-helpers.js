const fs = require('fs');
const { buildExternalHelpers } = require('babel-core');

function buildHelpers() {
	const code = buildExternalHelpers([
		'classCallCheck',
		'createClass',
		'extends',
		'inherits',
		'interopRequireDefault',
		'possibleConstructorReturn'
	]);

	const filename = 'helpers.js';

	fs.writeFileSync(filename, code);

	return filename;
}

module.exports = buildHelpers;

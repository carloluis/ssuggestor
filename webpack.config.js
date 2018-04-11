const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'dev' || !TARGET) {
	module.exports = require('./config/webpack.config.dev');
}
if (TARGET === 'stats') {
	module.exports = require('./config/webpack.config.prod')[1];
}
if (TARGET === 'build') {
	module.exports = require('./config/webpack.config.prod');
}

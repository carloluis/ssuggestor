const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'dev' || !TARGET) {
	module.exports = require('./config/webpack.config.dev');
}
if (TARGET === 'build' || TARGET === 'build:prod' || TARGET === 'build:dev' || TARGET === 'stats') {
	module.exports = require('./config/webpack.config.prod');
}

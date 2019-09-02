/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

// https://www.npmjs.com/package/log4js
const log4js = require('log4js');

// log level: 'all'|'info'|'trace'|'debug'|'warn'|'error'|'fatal'|'mark'

log4js.configure({
  appenders: { console: { type: 'file', filename: 'console.log' } },
  categories: { default: { appenders: ['console'], level: 'all' } }
});

const logger = log4js.getLogger('console');

exports.log = function(data) {
	logger.info(data);
};

exports.info = function(data) {
	logger.info(data);
};

exports.trace = function(data) {
	logger.trace(data);
};

exports.debug = function(data) {
	logger.debug(data);
};

exports.warn = function(data) {
	logger.warn(data);
};

exports.error = function(data) {
	logger.error(data);
};

exports.fatal = function(data) {
	logger.fatal(data);
};

exports.mark = function(data) {
	logger.mark(data);
};
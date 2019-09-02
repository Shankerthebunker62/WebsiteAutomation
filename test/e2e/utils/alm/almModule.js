/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

// Project location path
const dirPath = browser.params.dirPath;

// https://www.npmjs.com/package/hpe-alm-octane-js-rest-sdk
let Octane = require('octane')

/**
 * Conversion of the log4js framework to work with node.
 */
const console = require(dirPath + '/utils/logger/logModule.js');

// https://gist.github.com/jungleeforce/af83f36fec0aa9a102c6 --> sample
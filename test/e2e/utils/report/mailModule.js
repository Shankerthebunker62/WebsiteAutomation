/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

//https://docs.microsoft.com/en-us/outlook/rest/node-tutorial

// Project location path
const dirPath = browser.params.dirPath;

// https://www.npmjs.com/package/emailjs
let emailjs = require('emailjs').email;

// https://www.npmjs.com/package/nodemailer
let nodemailer = require('nodemailer');

// https://www.npmjs.com/package/node-ews
const EWS = require('node-ews');

/**
 * Conversion of the log4js framework to work with node.
 */
const console = require(dirPath + '/test/e2e/utils/logger/logModule.js');
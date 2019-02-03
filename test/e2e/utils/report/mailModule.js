/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

// Project location path
const dirPath = browser.params.dirPath;

// https://www.npmjs.com/package/emailjs
let emailjs = require('emailjs').email;

// https://www.npmjs.com/package/nodemailer
let nodemailer = require('nodemailer');
/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

// Fetches static variables
const StaticModule = require(`/Users/shankerthebunker/git/WebsiteAutomation/test/e2e/staticModule.js`);
let _StaticModule = new StaticModule();

// https://www.w3schools.com/nodejs/nodejs_filesystem.asp
let fs = require('fs');

// https://www.npmjs.com/package/nodemailer
let nodemailer = require('nodemailer');

// https://www.npmjs.com/package/node-ews
const EWS = require('node-ews');

/**
 * Conversion of the log4js framework to work with node.
 */
const console = require(_StaticModule.projectPath() + '/test/e2e/utils/logger/logModule.js');

fetchMailBody = function () {
	let mailBody = ``;
	
	fs.readFile(_StaticModule.fileName(), 'utf8', (error, data) => {
		if (error) {
			console.error(`error: ${error.message}, stackTrace ${error.stack}`);
		} else {
			console.log(`Attaching report to mail body: ${data}`);
			mailBody = data;
		}
	});
	
	return mailBody;
};

exports.sendMail = function () {
	let smtpConfig = {
			service : _StaticModule.host(),
			port: _StaticModule.port(),
			logger: true,
			debug: true,
			secure: true, // use SSL
			auth : {
				user : _StaticModule.userName(),
				pass : _StaticModule.password()
			}	
	};
	
	let mailOptions = {
			from : _StaticModule.sender(),
			to : _StaticModule.mailRecipients(),
			subject : `${_StaticModule.feature()} via Node.js`,
			html : fetchMailBody()
	};
	
	let transporter = nodemailer.createTransport(smtpConfig);
	
	transporter.verify((error, success) => {
	    if (error)
	    	console.error(`error: ${error.message}, stackTrace ${error.stack}`);
	    else
	    	console.log(`Your config is correct, success: ${success}`);
	});

	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
};
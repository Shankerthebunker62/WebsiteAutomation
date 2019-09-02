/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

// TODO:: Configuration variable should be replaced with a config.json
let configModule = {
    fileName: "SummaryReport.html",
    automationReport: "Protractor Gradle Automation Report",
    reportHeader: "Protractor Gradle Automation Report",
    feature: "Angular  Calculator Function",
    environment: "QA",
    testType: "Regression",
    operatingSystem: "Mac OS X",
    browserName: "Google Chrome",
};

// Project location path
const dirPath = browser.params.dirPath;

// Config file location
let config = (dirPath + '/' + browser.params.config);

// https://www.w3schools.com/nodejs/nodejs_filesystem.asp
const fs = require('fs');

/**
 * Conversion of the log4js framework to work with node.
 */
let console = require(dirPath + '/utils/logger/logModule.js');

fetchMailBody = async function() {
    let mailBody = ``;

    fs.readFile(configModule.fileName, 'utf8', (error, data) => {
        if (error) {
            console.error(`error: ${error.message}, stackTrace ${error.stack}`);
        } else {
            console.log(`Attaching report to mail body`);
            mailBody = data;
        }
    });

    return mailBody;
};

/**
 * Sending e-mail notification using 
 * 
 * nodemailer npm dependency
 */
exports.sendMailI = async function() {
    // https://www.npmjs.com/package/nodemailer
    let nodemailer = require('nodemailer');

    const smtpConfig = {
        service: 'gmail', // when using service block host and, port config

        host: 'smtp.gmail.com',
        port: '465',

        auth: {
            user: 'shankerthebunker1988',
            pass: ''

        },

        requireTLS: true,
        secureConnection: true,

        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: true
        },

        debug: true,
        logger: true
    };

    const mailOptions = {
        from: 'QA_Automation@qa.team.com',
        to: 'shankerhebunker@icloud.com',
        subject: `${configModule.feature} via Node.js`,
        html: fetchMailBody()
    };

    let transporter = nodemailer.createTransport(smtpConfig);

    transporter.verify((error, success) => {
        if (error)
            console.error(`Your config is incorrect, error: ${error.message}, stackTrace ${error.stack}`);
        else {
            console.log(`Your config is correct, success: ${success}`);
            console.log(`Sending email to mail recipents: ${'shankerhebunker@icloud.com'}`);
        }
    });

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error(`Email sending failed, error: ${error.message}, stackTrace ${error.stack}`);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });

    return;
};

/**
 * Sending e-mail notification using 
 * 
 * sendmail npm dependency
 */
exports.sendMailII = async function() {
    // https://www.npmjs.com/package/sendmail
    const sendmail = require('sendmail')({
        logger: {
            debug: console.log,
            info: console.info,
            warn: console.warn,
            error: console.error
        },
        silent: false,
        auth: {
            user: configModule.username,
            pass: configModule.password

        },
        dkim: { // Default: False
            privateKey: fs.readFileSync(dirPath + '/utils/report/dkim-private.pem', 'utf8'),
            keySelector: 'mydomainkey'
        },
        smtpPort: configModule.port, // Default: 25
        smtpHost: configModule.host // Default: -1 - extra smtp host after resolveMX
    });

    sendmail({
        from: configModule.sender,
        to: configModule.mailRecipients,
        subject: `${configModule.feature} via Node.js`,
        html: fetchMailBody(),
    }, function(error, info) {
        if (error) {
            console.error(`Email sending failed, error: ${error.message}, stackTrace ${error.stack}`);
        } else {
            console.dir(`Email sent: ${info.response}`);
        }
    });

    return;
};

/**
 * Sending e-mail notification using 
 * 
 * emailjs npm dependency
 */
exports.sendMailIII = async function() {
    //https://www.npmjs.com/package/emailjs
    let email = require('emailjs');

    let server = email.server.connect({
        user: configModule.username,
        password: configModule.password,
        host: configModule.host,
        tls: {
            ciphers: 'SSLv3'
        }
    });

    let message = {
        text: fetchMailBody(),
        from: configModule.sender,
        to: configModule.mailRecipients,
        cc: configModule.username,
        subject: `${configModule.feature} via Node.js`,
    };

    server.send(message, function(error, info) {
        if (error) {
            console.error(`Email sending failed, error: ${error.message}, stackTrace ${error.stack}`);
        } else {
            console.dir(`Email sent: ${info.response}`);
        }
    });

    return;
};

/**
 * Sending e-mail notification using 
 * 
 * email npm dependency
 */
exports.sendMailIV = async function() {
    // https://www.npmjs.com/package/email
    let Email = require('email').Email;

    let messageOption = {
        from: configModule.sender,
        to: configModule.mailRecipients,
        subject: `${configModule.feature} via Node.js`,
        body: fetchMailBody()
    };

    let message = new Email(messageOption);

    message.send(function(error) {
        if (error) {
            console.error(`Email sending failed, error: ${error.message}, stackTrace ${error.stack}`);
        } else {
            console.dir(`Email sent successfully !!`);
        }
    });

    return;
};

/**
 * Sending e-mail notification using 
 * 
 * node-ews npm dependency
 */
exports.sendMailV = async function() {
    // https://www.npmjs.com/package/node-ews
    const EWS = require('node-ews');

    // exchange server connection info
    const ewsConfig = {
        username: configModule.username,
        password: configModule.password,
        host: configModule.host // 'https://ews.domain.com'
    };

    const options = {
        rejectUnauthorized: false,
        strictSSL: false
    };
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    // initialize node-ews
    const ews = new EWS(ewsConfig, options);

    // define ews api function
    const ewsFunction = 'ExpandDL';

    // define ews api function args
    const ewsArgs = {
        'Mailbox': {
            'EmailAddress': `${configModule.mailRecipients}`
        }
    };

    // query EWS and print resulting JSON to console
    ews.run(ewsFunction, ewsArgs).then(result => {
        console.log(JSON.stringify(result));
    }).catch(error => {
        console.error(`error: ${error.message}, stackTrace ${error.stack}`);
    });

    return;
};

/**
 * Sending e-mail notification using 
 * 
 * exchange-web-service npm dependency
 */
exports.sendMail = async function() {
    // https://www.npmjs.com/package/exchange-web-service
    const ews = require("exchange-web-service");

    ews.config(`shankerthebunker@hotmail.com`, `ninapriya#1988`, `https://outlook.live.com/EWS/Exchange.asmx`, `hotmail.com`);
    ews.sendMail(`siddharth.shanker@rbc.com,shankerthebunker@icloud.com`, `Sent via Node.js`, fetchMailBody());

    return;
};

/**
 * Create Task notification using 
 * 
 * exchange-web-service npm dependency
 */
exports.createTask = async function() {
    // https://www.npmjs.com/package/exchange-web-service
    const ews = require("exchange-web-service").ews;

    ews.config(configModule.username, configModule.password, configModule.mailURL, configModule.mailDomain);

    //ews.createTask('task title', '<due date and time in format:2016-10-26T21:32:52>');
    ews.createTask('My Task Title', '2016-10-26T21:32:52');

    return;
};

/**
 * Create Appointment notification using 
 * 
 * exchange-web-service npm dependency
 */
exports.createAppointment = async function() {
    // https://www.npmjs.com/package/exchange-web-service
    const ews = require("exchange-web-service").ews;

    ews.config(configModule.username, configModule.password, configModule.mailURL, configModule.mailDomain);

    // ews.createAppointment('Subject of Appointment', 'Body of appointment', 'Start date in UTC eg.2016-08-03T21:32:52Z', 'End date in UTC eg.2016-08-03T22:32:52Z', ews.constants.CalendarBusyStatus.<Free|Tentative|Busy|OutOfOffice|NoStatus|WorkingElsewhere>, 'Location of appointment');
    ews.createAppointment('Meet a colleague', 'Meet Paul', '2016-08-03T21:32:52Z', '2016-08-03T22:32:52Z', ews.constants.CalendarBusyStatus.OutOfOffice, 'Coffee Corner');

    return;
};
/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

let StaticModule = function () {
	
	// Project Path location
	this.projectPath = function () { 
		return `/Users/shankerthebunker/git/WebsiteAutomation`;
	};

	// Resource location path
	this.uploadPath = function () { 
		return (`${this.projectPath()}/test/e2e/resources/uploads/`);
	};
	this.downloadPath = function () { 
		return (`${this.projectPath()}/test/e2e/resources/downloads/`);
	};
	this.execFilePath = function () { 
		return (`${this.projectPath()}/test/e2e/resources/execFile/`);
	};
	this.binaryPath = function () { 
		return (`${this.projectPath()}/test/e2e/resources/binary/`);
	};

	// Binary path location
	this.ieBinary = function () { 
		return (`${this.binaryPath()}IEDriverServer.exe`);
	};
	this.edgeBinary = function () { 
		return (`${this.binaryPath()}MicrosoftWebDriver.exe`);
	};
	this.operaBinary = function () { 
		return (`${this.binaryPath()}operadriver`);
	};
	this.chromeBinary = function () { 
		return (`${this.binaryPath()}chromedriver`);
	};
	this.firefoxBinary = function () { 
		return (`${this.binaryPath()}geckodriver`);
	};

	// HTML Report Output file
	this.fileName = function () { 
		return `SummaryReport.html`;
	};

	this.automationReport = function () { 
		return `Protractor Gradle Automation Report`;
	};
	this.reportHeader = function () { 
		return `Protractor Gradle Automation Report`;
	};
	this.feature = function () { 
		return `Angular Calculator Function`;
	};
	this.environment = function () { 
		return `QA`;
	};
	this.testType = function () { 
		return `Regression`;
	};

	this.operatingSystem = function () { 
		return `Mac OS X`;
	};
	this.browserName = function () { 
		return `Google Chrome`;
	};
	
	// e-Mail Setup
	this.userName = function () {
		return `username@domain.com`;
	};
	this.password = function () {
		return `appPassword`;
	};
	this.sender = function () {
		return `QA_Automation@qa.team.com`;
	};
	this.service = function () {
		return `serviceName`; // Gmail, hotmail, icloud
	};
	this.host = function () {
		return `smtp.domain.com`; // smtp.gmail.com, smtp.office365.com, smtp-mail.outlook.com, smtp.mail.me.com
	};
	this.port = function () {
		return `465`; // 465 for gmail or, 587 for others
	};
	this.mailRecipients = function () {
		return `recipients@domain.com`;
	};
};

module.exports = StaticModule;
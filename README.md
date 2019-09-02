<p><a href="https://travis-ci.org/angular/protractor" rel="nofollow"><img src="https://travis-ci.org/angular/protractor.svg?branch=master" alt="Build Status"></a> <a href="https://circleci.com/gh/angular/protractor" rel="nofollow"><img src="https://circleci.com/gh/angular/protractor.svg?style=shield" alt="CircleCI Status"></a> <a href="https://gitter.im/angular/protractor" rel="nofollow"><img src="https://badges.gitter.im/angular/protractor.svg" alt="Join the chat at https://gitter.im/angular/protractor"></a></p>

# "# WebsiteAutomation" 

<i>Protractor</i> Data-Driven Automation Framework using Excel UI Object Repository as well as Test Data. This is a BDD model using Jasmine. Each Method under script acts as a <i>Component</i> which loads a different data row for test case. The <i>Components</i> are called in mutiple test scenarios of BDD under each <i>Specs</i> for test cases to be used.
</br></br>

# Pre-Requisite

* Java (1.8 or, higher)
* Node Js
* Gradle

# Setup

<pre>
git clone https://github.com/Shankerthebunker62/WebsiteAutomation.git</br>
cd WebsiteAutomation</br>
npm install --unsafe-perm=true</br>
</pre>

# Execution:

* gradle wrapper
* gradle installGulp
* gradle clean build --refresh-dependencies
* gradle task e2e
* gradle --stop
</br></br>

# Firefox

<pre>
'browserName': 'firefox',
'logName': 'Firefox - English',
'moz:firefoxOptions': {
    'args': ['--verbose', '--safe-mode'] // '--headless'
}
</pre>

# Chrome

<pre>
'browserName': 'chrome',
'logName': 'Chrome - English',
'chromeOptions': {
	'args': ['--disable-gpu', 'test-type', 'disable-popup-blocking', 'start-maximized', 'disable-infobars'], // '--headless'
	'prefs': {
		'download': {
			'prompt_for_download': false,
			'directory_upgrade': true,
			'default_directory': _StaticModule.downloadPath()
		}
	}
}
</pre>

# Run Selenium hub with VNC supported 
	Firefox and Chrome with scale feature with the simple compose commands.

# GRID running at
http://localhost:4545/grid/console	

# Docker selenium-hub Compose
* $ docker-compose up -d
* $ docker-compose start
* $ docker-compose scale nodechrome=3 nodefirefox=3

* $ docker-compose stop
* $ docker-compose down

# To see the VNC port run
* $ docker-compose ps

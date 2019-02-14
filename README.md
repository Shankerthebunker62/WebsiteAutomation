<p>
	<a href="https://www.npmjs.com/@angular/core" rel="nofollow"><img src="https://camo.githubusercontent.com/3cb4eb3c991f38eddc8092d7d9c8c5b5d8888a33/68747470733a2f2f62616467652e667572792e696f2f6a732f253430616e67756c6172253246636f72652e737667" alt="npm version" data-canonical-src="https://badge.fury.io/js/%40angular%2Fcore.svg" style="max-width:100%;"></a>
</p>

# "# WebsiteAutomation" 

<i>Protractor</i> Data-Driven Automation Framework using Excel UI Object Repository as well as Test Data. This is a BDD model using Jasmine. Each Method under script acts as a <i>Component</i> which loads a different data row for test case. The <i>Components</i> are called in mutiple test scenarios of BDD under each <i>Specs</i> for test cases to be used.
</br></br>

# Pre-Requisite

* Java (1.8 or, higher)
* Node Js
* Gradle

# Setup

<pre>
git clone https://github.com/Shankerthebunker62/WebsiteAutomation.git
cd WebsiteAutomation
npm install --unsafe-perm=true
</pre>

# Execution:

* gradle wrapper
* gradle installGulp
* gradle clean build --refresh-dependencies
* gradle task e2e
* gradle --stop
</br></br>

# To Do:

* creating summary html report for step by step execution
* creating testCase html report for step by step execution
* creating a mail client or, execution
* locate the element from multiple window
* locate the element from multiple frames

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
			'default_directory': projectPath + '/test/e2e/resources/downloads/'
		}
	}
}
</pre>

const testDataModule = require('/Users/shankerthebunker/git/Protractor-Gradle/test/e2e/utils/testDataModule.js');
const uiMapModule = require('/Users/shankerthebunker/git/Protractor-Gradle/test/e2e/utils/uiMapModule.js');

// http://www.collectionsjs.com/ --> for collections alternative in .js

exports.uiKeywordAction = function (elementName, elementAction, pageData, dataColumn) {
	var _element = uiMapModule.getExcelUIMap(elementName);
	var _testData = testDataModule.getExcelTestData(pageData, dataColumn);
	var _action = elementAction;
	
	var _result = false;
	
	try {
		switch (_action) {
			case 'click':
				_element.click();
				break;

			case 'setValue':
				_element.sendKeys(_testData);
				break;
				
			default:
				throw 'No Such Action On Element Found';
		}
		_result = true;
	} catch (error) {
		console.log(error.message);
	}
	
	if (_result)
		console.log(elementAction + ' on ' + elementName + ' :passed');
	else
		console.log(elementAction + ' on ' + elementName + ' :failed');
	
	return _result;
}
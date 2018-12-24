let filePath = '/Users/shankerthebunker/git/Protractor-Gradle/test/e2e/resources/';

var XLSX = require('xlsx');

readUIMap = function() {
	var workbook = XLSX.readFile(filePath + 'uiMap.xlsx');
	return workbook;
}

toUIMapJson = function() {
	try {
		var workbook = readUIMap();
		var jsonResult = {};
		workbook.SheetNames.forEach(function(sheetName) {
			var roa = XLSX.utils
					.sheet_to_row_object_array(workbook.Sheets[sheetName]);
			if (roa.length > 0) {
				jsonResult[sheetName] = roa;
			}
		});
		return jsonResult;
	} catch (error) {
		console.log(err.message);
		return null;
	}
}

fetchElementBy = function(locatorType, locator) {
	locatorType = locatorType.replace(/(^\s+|\s+$)/g, '');
	var _element = '';
	
	try {
		switch (locatorType) {
		case 'id':
			_element = element.all(by.id(locator));
			break;
			
		case 'name':
			_element = element.all(by.name(locator));
			break;

		case 'css':
			_element = element.all(by.css(locator));
			break;

		case 'className':
			_element = element.all(by.className(locator));
			break;

		case 'xpath':
			_element = element.all(by.xpath(locator));
			break;

		case 'linkText':
			_element = element.all(by.linkText(locator));
			break;

		case 'partialLinkText':
			_element = element.all(by.partialLinkText(locator));
			break;

		case 'buttonText':
			_element = element.all(by.buttonText(locator));
			break;

		case 'partialButtonText':
			_element = element(by.partialButtonText(locator));
			break;

		case 'deepCss':
			_element = element.all(by.deepCss(locator));
			break;

		case 'binding':
			_element = element.all(by.binding(locator));
			break;

		case 'exactBinding':
			_element = element.all(by.exactBinding(locator));
			break;

		case 'model':
			_element = element.all(by.model(locator));
			break;

		case 'repeater':
			_element = element.all(by.repeater(locator));
			break;

		case 'exactRepeater':
			_element = element.all(by.exactRepeater(locator));
			break;

		case 'options':
			_element = element.all(by.options(locator));
			break;

		default:
			throw 'No Such Element Locator Type Found';
		}
	} catch (error) {
		console.log(err.message);
	}
	
	console.log('Element locator type: ' + locatorType);
	console.log('Element locator: ' + locator);
	
	return _element;
}

exports.getExcelUIMap = function(elementName) {
	let __element = '';

	try {
		var pageName = elementName.split('.')[0];
		var locator = elementName.split('.')[1];

		var workbook = readUIMap();
		var worksheet = workbook.Sheets['locators'];
		var excelRows = XLSX.utils.sheet_to_row_object_array(worksheet);

		for (var i = 0; i < excelRows.length; i++) {
			if (excelRows[i].pageName === pageName && excelRows[i].elementName === locator) {
				__element = fetchElementBy(excelRows[i].locatorTypes, excelRows[i].locator);
				break;		
			}
		}
	} catch (error) {
		console.log(error.message);
	}
	return __element;
}
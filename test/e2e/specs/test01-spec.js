const uiDriver = require('/Users/shankerthebunker/git/Protractor-Gradle/test/e2e/utils/webUIActionModule.js');

describe('Protractor Demo App', function() {
	
	beforeAll(function() {
	    browser.get('http://juliemr.github.io/protractor-demo/');
	});
	
	it('Module Two Numbers', function() {
		var pageData = 'Module._DefaultCompRowTwo';
	
		WebUIAction.uiAction('Module.operator', 'setValue', pageData, 'Select@Operator');
		
		expect(testDataModule.getExcelTestData(pageData, 'Select@Operator')).toEqual(element(by.model('operator')).$('option:checked').getText());
	
		element(by.model('first')).sendKeys(testDataModule.getExcelTestData(pageData, 'type@ValueOne'));
	
		expect(testDataModule.getExcelTestData(pageData, 'type@ValueOne')).toEqual(element(by.model('first')).getAttribute('value'));
	
		element(by.model('second')).sendKeys(testDataModule.getExcelTestData(pageData, 'type@ValueTwo'));
	
		expect(testDataModule.getExcelTestData(pageData, 'type@ValueTwo')).toEqual(element(by.model('second')).getAttribute('value'));
	
		element(by.id('gobutton')).click();
	
		expect(testDataModule.getExcelTestData(pageData, 'verify@Output')).toEqual(element(by.binding('latest')).getText());
	});
	
	it('Add Two Numbers', function() {
		var pageData = 'Add._DefaultCompRowTwo';
		
		element(by.model('operator')).sendKeys(testDataModule.getExcelTestData(pageData, 'Select@Operator'));
		
		expect(testDataModule.getExcelTestData(pageData, 'Select@Operator')).toEqual(element(by.model('operator')).$('option:checked').getText());
		
		element(by.model('first')).sendKeys(testDataModule.getExcelTestData(pageData, 'type@ValueOne'));
		
		expect(testDataModule.getExcelTestData(pageData, 'type@ValueOne')).toEqual(element(by.model('first')).getAttribute('value'));
		
		element(by.model('second')).sendKeys(testDataModule.getExcelTestData(pageData, 'type@ValueTwo'));
		
		expect(testDataModule.getExcelTestData(pageData, 'type@ValueTwo')).toEqual(element(by.model('second')).getAttribute('value'));
		
		element(by.id('gobutton')).click();
		
		expect(testDataModule.getExcelTestData(pageData, 'verify@Output')).toEqual(element(by.binding('latest')).getText());
	});
	
	it('Substract Two Numbers', function() {
		var pageData = 'Substract._DefaultCompRowTwo';
	
		element(by.model('operator')).sendKeys(testDataModule.getExcelTestData(pageData, 'Select@Operator'));
	
		expect(testDataModule.getExcelTestData(pageData, 'Select@Operator')).toEqual(element(by.model('operator')).$('option:checked').getText());
	
		element(by.model('first')).sendKeys(testDataModule.getExcelTestData(pageData, 'type@ValueOne'));
	
		expect(testDataModule.getExcelTestData(pageData, 'type@ValueOne')).toEqual(element(by.model('first')).getAttribute('value'));
	
		element(by.model('second')).sendKeys(testDataModule.getExcelTestData(pageData, 'type@ValueTwo'));
	
		expect(testDataModule.getExcelTestData(pageData, 'type@ValueTwo')).toEqual(element(by.model('second')).getAttribute('value'));
	
		element(by.id('gobutton')).click();
	
		expect(testDataModule.getExcelTestData(pageData, 'verify@Output')).toEqual(element(by.binding('latest')).getText());
	});
	
	it('Multiply Two Numbers', function() {
		var pageData = 'Multiply._DefaultCompRowTwo';
	
		element(by.model('operator')).sendKeys(testDataModule.getExcelTestData(pageData, 'Select@Operator'));
	
		expect(testDataModule.getExcelTestData(pageData, 'Select@Operator')).toEqual(element(by.model('operator')).$('option:checked').getText());
	
		element(by.model('first')).sendKeys(testDataModule.getExcelTestData(pageData, 'type@ValueOne'));
	
		expect(testDataModule.getExcelTestData(pageData, 'type@ValueOne')).toEqual(element(by.model('first')).getAttribute('value'));
	
		element(by.model('second')).sendKeys(testDataModule.getExcelTestData(pageData, 'type@ValueTwo'));
	
		expect(testDataModule.getExcelTestData(pageData, 'type@ValueTwo')).toEqual(element(by.model('second')).getAttribute('value'));
	
		element(by.id('gobutton')).click();
	
		expect(testDataModule.getExcelTestData(pageData, 'verify@Output')).toEqual(element(by.binding('latest')).getText());
	});
	
	it('Divide Two Numbers', function() {
		var pageData = 'Divide._DefaultCompRowTwo';
	
		element(by.model('operator')).sendKeys(testDataModule.getExcelTestData(pageData, 'Select@Operator'));
	
		expect(testDataModule.getExcelTestData(pageData, 'Select@Operator')).toEqual(element(by.model('operator')).$('option:checked').getText());
	
		element(by.model('first')).sendKeys(testDataModule.getExcelTestData(pageData, 'type@ValueOne'));
	
		expect(testDataModule.getExcelTestData(pageData, 'type@ValueOne')).toEqual(element(by.model('first')).getAttribute('value'));
	
		element(by.model('second')).sendKeys(testDataModule.getExcelTestData(pageData, 'type@ValueTwo'));
	
		expect(testDataModule.getExcelTestData(pageData, 'type@ValueTwo')).toEqual(element(by.model('second')).getAttribute('value'));
	
		element(by.id('gobutton')).click();
	
		expect(testDataModule.getExcelTestData(pageData, 'verify@Output')).toEqual(element(by.binding('latest')).getText());
	});
	
	afterAll(function() {
	    browser.close();
	});
});
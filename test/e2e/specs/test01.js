/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

// Project location path
const dirPath = browser.params.dirPath;

const SuperCalculator = require(dirPath + '/test/e2e/scripts/Super-Calculator-Module.js');

const testCasePurpose = 'Protractor Demo App 01';

let _SuperCalculator = new SuperCalculator();

describe(testCasePurpose, function() {
	
	beforeAll(function() {
		_SuperCalculator.launchUrl('_DefaultCompRow');
	});
	
	beforeEach(function() {
		
	});
	
	it('Multiply Two Numbers', function() {
		_SuperCalculator.Multiply('_DefaultCompRowTwo');
	});
	
	it('Add Two Numbers', function() {
		_SuperCalculator.Add('_DefaultCompRowTwo');
	});
	
	it('Module Two Numbers', function() {
		_SuperCalculator.Module('_DefaultCompRowTwo');
	});
	
	it('Divide Two Numbers', function() {
		_SuperCalculator.Divide('_DefaultCompRowTwo');
	});
	
	it('Substract Two Numbers', function() {
		_SuperCalculator.Substract('_DefaultCompRowTwo');
	});
	
	afterEach(function() {
	    
	});
	
	afterAll(function() {
		_SuperCalculator.closeBrowser();
	});
});
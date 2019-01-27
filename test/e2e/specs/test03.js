/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

//Project location path
const dirPath = browser.params.dirPath;

const SuperCalculator = require(dirPath + '/test/e2e/scripts/Super-Calculator-Module.js');

const testCasePurpose = 'Protractor Demo App 03';

let _SuperCalculator = new SuperCalculator();

describe(testCasePurpose, function() {
	
	beforeAll(function() {
		_SuperCalculator.launchUrl('_DefaultCompRow', testCasePurpose);
	});
	
	beforeEach(function() {
		
	});
	
	it('Multiply Two Numbers', function() {
		_SuperCalculator.Multiply('_DefaultCompRowOne');
	});
	
	it('Add Two Numbers', function() {
		_SuperCalculator.Add('_DefaultCompRowOne');
	});
	
	it('Module Two Numbers', function() {
		_SuperCalculator.Module('_DefaultCompRowOne');
	});
	
	it('Divide Two Numbers', function() {
		_SuperCalculator.Divide('_DefaultCompRowOne');
	});
	
	it('Substract Two Numbers', function() {
		_SuperCalculator.Substract('_DefaultCompRowOne');
	});
	
	afterEach(function() {
	    
	});
	
	afterAll(function() {
		_SuperCalculator.closeBrowser();
	});
});
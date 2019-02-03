/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

// Project location path
const dirPath = browser.params.dirPath;

const SuperCalculator = require(dirPath + '/test/e2e/scripts/scriptModule.js');
let _SuperCalculator = new SuperCalculator();

const testCasePurpose01 = 'Protractor Demo App 01';
const testCasePurpose02 = 'Protractor Demo App 02';
const testCasePurpose03 = 'Protractor Demo App 03';

describe(testCasePurpose01, function() {
	
	beforeAll(function() {
		
	});
	
	beforeEach(function() {
		
	});
	
	it('Launching Browser', function() {
		_SuperCalculator.launchUrl('_DefaultCompRow');
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
	
	it('Closing Browser', function() {
		_SuperCalculator.closeBrowser();
	});
	
	afterEach(function() {
	    
	});
	
	afterAll(function() {
		
	});
});

describe(testCasePurpose02, function() {
	
	beforeAll(function() {
		
	});
	
	beforeEach(function() {
		
	});
	
	it('Launching Browser', function() {
		_SuperCalculator.launchUrl('_DefaultCompRow');
	});
	
	it('Multiply Two Numbers', function() {
		_SuperCalculator.Multiply('_DefaultCompRowTwo');
	});
	
	it('Add Two Numbers', function() {
		_SuperCalculator.Add('_DefaultCompRowOne');
	});
	
	it('Module Two Numbers', function() {
		_SuperCalculator.Module('_DefaultCompRowTwo');
	});
	
	it('Divide Two Numbers', function() {
		_SuperCalculator.Divide('_DefaultCompRowOne');
	});
	
	it('Substract Two Numbers', function() {
		_SuperCalculator.Substract('_DefaultCompRowTwo');
	});
	
	it('Closing Browser', function() {
		_SuperCalculator.closeBrowser();
	});
	
	afterEach(function() {
	    
	});
	
	afterAll(function() {
		
	});
});

describe(testCasePurpose03, function() {
	
	beforeAll(function() {
		
	});
	
	beforeEach(function() {
		
	});
	
	it('Launching Browser', function() {
		_SuperCalculator.launchUrl('_DefaultCompRow');
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
	
	it('Closing Browser', function() {
		_SuperCalculator.closeBrowser();
	});
	
	afterEach(function() {
	    
	});
	
	afterAll(function() {
		
	});
});
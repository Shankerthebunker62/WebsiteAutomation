/*******************************************************************
 *                                        						   *
 * Author: Siddharth Shanker               						   *
 * Date: December, 2018.                            			   *
 * GitHub: https://github.com/Shankerthebunker62/Protractor-Gradle *
 *                                        						   *
 *******************************************************************/

const dirPath = '/Users/shankerthebunker/git/Protractor-Gradle';

const SuperCalculator = require(dirPath + '/test/e2e/scripts/Super-Calculator-Module.js');

let _SuperCalculator = new SuperCalculator();

describe('Protractor Demo App 01', function() {
	let value;
	let originalTimeout;
	
	beforeAll(function() {
		_SuperCalculator.launchUrl();
	});
	
	beforeEach(function(done) {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        
		setTimeout(function() {
		      value = 0;
		      done();
		 }, 1);
	})
	
	it('Multiply Two Numbers', function(done) {
		value++;
		_SuperCalculator.Multiply('_DefaultCompRowTwo');
		
		done();
	});
	
	it('Add Two Numbers', function(done) {
		value++;
		_SuperCalculator.Add('_DefaultCompRowTwo');
		
		done();
	});
	
	it('Module Two Numbers', function(done) {
		value++;
		_SuperCalculator.Module('_DefaultCompRowTwo');
		
		done();
	});
	
	it('Divide Two Numbers', function(done) {
		value++;
		_SuperCalculator.Divide('_DefaultCompRowTwo');
		
		done();
	});
	
	it('Substract Two Numbers', function(done) {
		value++;
		_SuperCalculator.Substract('_DefaultCompRowTwo');
		
		done();
	});
	
	afterEach(function() {
	      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});
	
	afterAll(function() {
		_SuperCalculator.closeBrowser();
	});
});
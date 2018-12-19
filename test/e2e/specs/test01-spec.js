describe('Protractor Demo App', function() {
	beforeAll(function() {
	    browser.get('http://juliemr.github.io/protractor-demo/');
	});
	
	it('Add Two Numbers', function() {
		element(by.model('operator')).sendKeys('+');
		
		expect('+').toEqual(element(by.model('operator')).$('option:checked').getText());
		
		element(by.model('first')).sendKeys('4');
		
		expect('4').toEqual(element(by.model('first')).getAttribute('value'));
		
		element(by.model('second')).sendKeys('6');
		
		expect('6').toEqual(element(by.model('second')).getAttribute('value'));
		
		element(by.id('gobutton')).click();
		
		expect('10').toEqual(element(by.binding('latest')).getText());
	});
	
	it('Substract Two Numbers', function() {
		element(by.model('operator')).sendKeys('-');
		
		expect('-').toEqual(element(by.model('operator')).$('option:checked').getText());
		
		element(by.model('first')).sendKeys('8');
		
		expect('8').toEqual(element(by.model('first')).getAttribute('value'));
		
		element(by.model('second')).sendKeys('3');
		
		expect('3').toEqual(element(by.model('second')).getAttribute('value'));
		
		element(by.id('gobutton')).click();
		
		expect('5').toEqual(element(by.binding('latest')).getText());
	});
	
	it('Multiply Two Numbers', function() {
		element(by.model('operator')).sendKeys('*');
		
		expect('*').toEqual(element(by.model('operator')).$('option:checked').getText());
		
		element(by.model('first')).sendKeys('7');
		
		expect('7').toEqual(element(by.model('first')).getAttribute('value'));
		
		element(by.model('second')).sendKeys('5');
		
		expect('5').toEqual(element(by.model('second')).getAttribute('value'));
		
		element(by.id('gobutton')).click();
		
		expect('35').toEqual(element(by.binding('latest')).getText());
	});
	
	it('Divide Two Numbers', function() {
		element(by.model('operator')).sendKeys('/');
		
		expect('/').toEqual(element(by.model('operator')).$('option:checked').getText());
		
		element(by.model('first')).sendKeys('12');
		
		expect('12').toEqual(element(by.model('first')).getAttribute('value'));
		
		element(by.model('second')).sendKeys('2');
		
		expect('2').toEqual(element(by.model('second')).getAttribute('value'));
		
		element(by.id('gobutton')).click();
		
		expect('6').toEqual(element(by.binding('latest')).getText());
	});
	
	it('Module Two Numbers', function() {
		element(by.model('operator')).sendKeys('%');
		
		expect('%').toEqual(element(by.model('operator')).$('option:checked').getText());
		
		element(by.model('first')).sendKeys('7');
		
		expect('7').toEqual(element(by.model('first')).getAttribute('value'));
		
		element(by.model('second')).sendKeys('3');
		
		expect('3').toEqual(element(by.model('second')).getAttribute('value'));
		
		element(by.id('gobutton')).click();
		
		expect('1').toEqual(element(by.binding('latest')).getText());
	});
	
	afterAll(function() {
	    browser.close();
	});
});
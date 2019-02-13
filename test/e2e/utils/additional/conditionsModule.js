/***********************************************************************
 *                                        						       *
 * Author: Siddharth Shanker               						       *
 * Date: December, 2018.                            			   	   *
 * GitHub: https://github.com/Shankerthebunker62/WebsiteAutomation.git *
 *                                        						       *
 ***********************************************************************/

//Project location path
const dirPath = browser.params.dirPath;

// Expected Conditions for UI Elements
let EC = protractor.ExpectedConditions;

const TIMEOUT_IN_MILISECONDS = 30000;

/**
 * Conversion of the log4js framework to work with node.
 */
const console = require(dirPath + '/test/e2e/utils/logger/logModule.js');

/**
 * An expected condition that returns the negated value.
 * 
 * @param: _condition to be negated
 * @returns: promise
 */
exports.waitForNotCondition = function (_condition) {
	  return browser.wait(EC.not(_condition), TIMEOUT_IN_MILISECONDS).then(() => {
		  return true;
	  }).catch((error) => {
		  console.error(`error: ${error.message}`);
		  return false;
	  });
};

/**
 * An expected condition that returns a promise which evaluates to the result of the logical and.
 * 
 * @param: _condition01 could be boolean or, another expectedCondition
 * @param: _condition02 could be boolean or, another expectedCondition
 * @return: promise
 */
exports.waitForAndCondition = function (_condition01, _condition02) {
	  return browser.wait(EC.and(_condition01, _condition02), TIMEOUT_IN_MILISECONDS).then(() => {
		  return true;
	  }).catch((error) => {
		  console.error(`error: ${error.message}`);
		  return false;
	  });
};

/**
 * An expected condition that returns a promise which evaluates to the result of the logical or.
 *
 * @param: _condition01 could be boolean or, another expectedCondition
 * @param: _condition02 could be boolean or, another expectedCondition
 * @return: promise
 */
exports.waitForOrCondition = function (_condition01, _condition02) {
	  return browser.wait(EC.or(_condition01, _condition02), TIMEOUT_IN_MILISECONDS).then(() => {
		  return true;
	  }).catch((error) => {
		  console.error(`error: ${error.message}`);
		  return false;
	  });
};

/**
 * An expected condition that returns a promise representing whether an alert is present.
 * 
 * @return: promise
 */
exports.alertIsPresent = function () {
	return browser.wait(EC.alertIsPresent(), TIMEOUT_IN_MILISECONDS).then(() => {
		return true;
	}).catch((error) => {
		console.error(`error: ${error.message}`);
		return false;
	});
};

/**
 * An expected condition that returns a promise representing whether the element is clickable.
 * 
 * @param: _element to be checked if is click able or, not
 * @return: promise
 */
exports.waitForElementToBeClickable = function (_element) {
	  return browser.wait(EC.elementToBeClickable(_element), TIMEOUT_IN_MILISECONDS).then(() => {
		  return true;
	  }).catch((error) => {
		  console.error(`error: ${error.message}`);
		  return false;
	  });
};

/**
 * An expected condition that returns a promise representing whether the text is present in the element.
 * 
 * @param: _element to be checked
 * @param: _text present in the _element
 * @return: promise
 */
exports.waitForElementTextToBePresentIn = function (_element, _text) {
	  return browser.wait(EC.textToBePresentIn(_element, _text), TIMEOUT_IN_MILISECONDS).then(() => {
		  return true;
	  }).catch((error) => {
		  console.error(`error: ${error.message}`);
		  return false;
	  });
};

/**
 * An expected condition that returns a promise representing whether the text is present in the element's value.
 *
 * @param: _element to be checked
 * @param: _text value present in the _element
 * @return: promise
 */
exports.waitForElementTextToBePresentInValue = function (_element, _text) {
	  return browser.wait(EC.textToBePresentInElementValue(_element, _text), TIMEOUT_IN_MILISECONDS).then(() => {
		  return true;
	  }).catch((error) => {
		  console.error(`error: ${error.message}`);
		  return false;
	  });
};

/**
 * An expected condition that returns a promise representing whether the title contains the string.
 * 
 * @param: _titleContains to be checked if title contains same/similar text/value or not
 * @return: promise
 */
exports.titleContains = function (_titleContains) {
	return browser.wait(EC.titleContains(_titleContains), TIMEOUT_IN_MILISECONDS).then(() => {
		 return true;
	}).catch((error) => {
		 console.error(`error: ${error.message}`);
		 return false;
	});
};

/**
 * An expected condition that returns a promise representing whether the title equals the string.
 * 
 * @param: _title to be checked if title is same or not
 * @return: promise
 */
exports.titleIs = function (_title) {
	return browser.wait(EC.titleIs(_title), TIMEOUT_IN_MILISECONDS).then(() => {
		 return true;
	}).catch((error) => {
		 console.error(`error: ${error.message}`);
		 return false;
	});
};

/**
 * An expected condition that returns a promise representing whether the URL contains the string.
 * 
 * @param: _urlContains to be checked if url contains same/similar text/value or not
 * @return: promise
 */
exports.urlContains = function (_urlContains) {
	return browser.wait(EC.urlContains(_urlContains), TIMEOUT_IN_MILISECONDS).then(() => {
		 return true;
	}).catch((error) => {
		 console.error(`error: ${error.message}`);
		 return false;
	});
};

/**
 * An expected condition that returns a promise representing whether the url equals the string.
 * 
 * @param: _url to be checked if url is same or not
 * @return: promise
 */
exports.urlIs = function (_url) {
	return browser.wait(EC.urlIs(_url), TIMEOUT_IN_MILISECONDS).then(() => {
		 return true;
	}).catch((error) => {
		 console.error(`error: ${error.message}`);
		 return false;
	});
};

/**
 * An expected condition that returns a promise representing whether the element is present.
 * 
 * @param: _element to be checked is present or not
 * @return: promise
 */
exports.waitForElementPresenceOf = function (_element) {
	return browser.wait(EC.presenceOf(_element), TIMEOUT_IN_MILISECONDS).then(() => {
		return true;
	}).catch((error) => {
		console.error(`error: ${error.message}`);
		return false;
	});
};

/**
 * An expected condition that returns a promise representing whether the element is stale.
 * 
 * @param: _element to be checked if became stale or not
 * @return: promise
 */
exports.waitForElementStalenessOf = function (_element) {
	return browser.wait(EC.stalenessOf(_element), TIMEOUT_IN_MILISECONDS).then(() => {
		 return true;
	}).catch((error) => {
		 console.error(`error: ${error.message}`);
		 return false;
	});
};

/**
 * An expected condition that returns a promise representing whether the element is visible.
 * 
 * @param: _element to be checked if became visible or not
 * @return: promise
 */
exports.waitForElementVisiblity = function (_element) {
	return browser.wait(EC.visibilityOf(_element), TIMEOUT_IN_MILISECONDS).then(() => {
		 return true;
	}).catch((error) => {
		 console.error(`error: ${error.message}`);
		 return false;
	});
};

/**
 * An expected condition that returns a promise representing whether the element is invisible.
 * 
 * @param: _element to be checked if became invisible or not
 * @return: promise
 */
exports.waitForElementInvisibilityOf = function (_element) {
	return browser.wait(EC.invisibilityOf(_element), TIMEOUT_IN_MILISECONDS).then(() => {
		 return true;
	}).catch((error) => {
		 console.error(`error: ${error.message}`);
		 return false;
	});
};

/**
 * An expected condition that returns a promise representing whether the element is selected.
 * 
 * @param: _element to be checked if selected or not
 * @return: promise
 */
exports.waitForElementToBeSelected = function (_element) {
	return browser.wait(EC.elementToBeSelected(_element), TIMEOUT_IN_MILISECONDS).then(() => {
		 return true;
	}).catch((error) => {
		 console.error(`error: ${error.message}`);
		 return false;
	});
};
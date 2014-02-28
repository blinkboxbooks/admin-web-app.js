'use strict';

beforeEach(function() {
	this.addMatchers({
		toHaveClass: function(input) {
			return this.actual.hasClass(input);
		},
		toMatch: function(input) {
			return this.actual.is(input);
		},
		toBeArray: function(){
			return $.isArray(this.actual);
		}
	});
});
/**
 * Calendar class
 */
global.CALENDAR = CLASS({

	init : function(inner, self, date) {
		'use strict';
		//OPTIONAL: date

		var
		// get year.
		getYear,

		// get month.
		getMonth,

		// get date.
		getDate,

		// get day.
		getDay,

		// get hour.
		getHour,

		// get minute
		getMinute,

		// get second.
		getSecond;

		if (date === undefined) {
			date = new Date();
		}

		self.getYear = getYear = function() {
			return date.getFullYear();
		};

		self.getMonth = getMonth = function() {
			return date.getMonth() + 1;
		};

		self.getDate = getDate = function() {
			return date.getDate();
		};

		self.getDay = getDay = function() {
			return date.getDay();
		};

		self.getHour = getHour = function() {
			return date.getHours();
		};

		self.getMinute = getMinute = function() {
			return date.getMinutes();
		};

		self.getSecond = getSecond = function() {
			return date.getSeconds();
		};
	}
});

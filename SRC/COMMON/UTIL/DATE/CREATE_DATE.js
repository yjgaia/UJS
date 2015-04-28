/**
 * create date type.
 */
global.CREATE_DATE = METHOD({

	run : function(params) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.year
		//OPTIONAL: params.month
		//OPTIONAL: params.date
		//OPTIONAL: params.hour
		//OPTIONAL: params.minute
		//OPTIONAL: params.second
		
		var
		// year
		year = params.year,
		
		// month
		month = params.month,
		
		// date
		date = params.date,
		
		// hour
		hour = params.hour,
		
		// minute
		minute = params.minute,
		
		// second
		second = params.second,
		
		// now cal
		nowCal = CALENDAR(new Date());

		return new Date(
			year === undefined ? nowCal.getYear() : year,
			(month === undefined ? nowCal.getYear() : month) - 1,
			date === undefined ? nowCal.getDate() : date,
			hour === undefined ? nowCal.getHour() : hour,
			minute === undefined ? nowCal.getMinute() : minute,
			second === undefined ? nowCal.getSecond() : second
		);
	}
});

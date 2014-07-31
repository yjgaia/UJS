/**
 * check are same data set or arrays.
 */
global.CHECK_ARE_SAME = CHECK_ARE_SAME = METHOD({

	run : function(dataSet) {'use strict';
		//REQUIRED: dataSet

		var
		// first data
		firstData,

		// are same
		areSame = false,

		// check two same.
		checkTwoSame = function(a, b) {

			// when a, b are date
			if ( a instanceof Date === true && b instanceof Date === true) {
				return a.getTime() === b.getTime();
			}

			// when a, b are data (JS object)
			else if (CHECK_IS_DATA(a) === true && CHECK_IS_DATA(b) === true) {
				return EACH(a, function(value, name) {
					return checkTwoSame(value, b[name]);
				});
			}

			// when a, b are array
			else if (CHECK_IS_ARRAY(a) === true && CHECK_IS_ARRAY(b) === true) {
				return EACH(a, function(value, i) {
					return checkTwoSame(value, b[i]);
				});
			}

			// when a, b are value
			else {
				return a === b;
			}
		};

		if (dataSet.length > 1) {

			areSame = REPEAT(dataSet.length, function(i) {
				if (i < dataSet.length - 1) {
					return checkTwoSame(dataSet[i], dataSet[i + 1]);
				} else {
					return checkTwoSame(dataSet[i], dataSet[0]);
				}
			});
		}

		return areSame;
	}
});

var _ = require('lodash');
var validate = require('jsonschema').validate;


var result = a => {
	for (var x in a)
		if (typeof a[x] === 'undefined')
			delete a[x];
	return a;
}


exports.object = properties => result({ type: 'object', required: _.keys(properties), properties });


exports.int = (minimum, maximum) => result({ type: 'integer', minimum, maximum });
exports.int.NATURAL = exports.int(0);
exports.int.POSITIVE = exports.int(1);


exports.array = (items, minItems, maxItems) => result({ items, minItems, maxItems, type: 'array' });


exports.set = (items, minItems, maxItems) =>
	result({ items, minItems, maxItems, uniqueItems: true, type: 'array' });


exports.number = (minimum, maximum, exclusiveMinimum, exclusiveMaximum) =>
	result({ type: 'number', minimum, maximum, exclusiveMinimum, exclusiveMaximum });


exports.string = (pattern, minLength, maxLength) => result({ pattern, minLength, maxLength, type: 'string' });
exports.string.noHtml = (minLength, maxLength) =>
	exports.string.call(null, '^[^<>]*$', minLength, maxLength);


exports.validate = function(arg, schema) {
	var result = validate(arg, schema).errors;
	if (!result.length)
		return false;
	var map = _.groupBy(result, 'property');
	for (var property in map) {
		var group = map[property];
		for (var i = 0, ii = group.length; i < ii; i++)
			group[i] = group[i].message;
	}
	return map;
};

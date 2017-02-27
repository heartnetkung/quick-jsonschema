var qjs = require('./index');

describe('validate', function() {
	it('should do basic functions', function() {
		expect(qjs.validate({}, { type: 'object' })).toBe(false);
		expect(qjs.validate(2, { type: 'object' })).toEqual({ instance: ['is not of a type(s) object'] });
		expect(qjs.validate('', { type: 'string', minLength: 1, pattern: '\d+' })).toEqual({
			instance: ['does not meet minimum length of 1', 'does not match pattern "d+"']
		});
		expect(qjs.validate([2, 3], { type: 'array', items: { type: 'string' } })).toEqual({
			'instance[0]': ['is not of a type(s) string'],
			'instance[1]': ['is not of a type(s) string']
		});
		expect(qjs.validate({ foo: 42 }, { properties: { foo: { type: 'string' } } })).toEqual({
			'instance.foo': ['is not of a type(s) string']
		});

	});

	it('should work with undefined properties', function() {
		expect(qjs.validate(3, qjs.int())).toBe(false);
	});
});

describe('object', function() {
	it('should do basic functions', function() {
		expect(qjs.object({})).toEqual({ type: 'object', required: [], properties: {} });
		expect(qjs.object()).toEqual({ type: 'object', required: [] });
		expect(qjs.object({ foo: { type: 'string' } }))
			.toEqual({ type: 'object', required: ['foo'], properties: { foo: { type: 'string' } } });
	});
});

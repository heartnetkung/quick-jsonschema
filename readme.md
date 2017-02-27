# quick-jsonschema

## Overview
This library builds on top of [jsonschema](https://github.com/tdegrunt/jsonschema) and make it less wordy. It simplifies 2 tings:
* more concise validate function
* many short-hand methods for building schema

## Installation
```
npm install --save quick-jsonschema
```

## Validate API
```js
var q = require('quick-jsonschema');

// return false
q.validate({}, {type: 'object'});

// return { instance: ['does not meet minimum length of 1', 'does not match pattern "d+"'] }
q.validate('', { type: 'string', minLength: 1, pattern: '\d+' });

// return { 'instance[0]': ['is not of a type(s) string'], 'instance[1]': ['is not of a type(s) string'] }
q.validate([2, 3], { type: 'array', items: { type: 'string' } });

```

## Shorthand Methods API
* q.object(properties)
* q.array(items, minItems, maxItems)
* q.set(items, minItems, maxItems) //similar to array but all items are unique
* q.int(min, max)
* q.int.NATURAL
* q.int.POSITIVE
* q.number(minimum, maximum, exclusiveMinimum, exclusiveMaximum)
* q.string(pattern, minLength, maxLength)
* q.string.noHtml(minLength, maxLength)


Example

```js
var schema = q.object({ foo: q.int(42,45), bar: q.set(q.string(), 1) });
var data = { foo: 43, bar: ['a', 'b'] };
// return false
q.validate(data, schema);
```
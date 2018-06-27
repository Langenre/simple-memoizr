# Simple-Memoizr

### Installation

To install the current version:

    $ npm install --save simple-memoizr

This assumes you are using npm as your package manager.

### Usage

Create a function that memoizes the results of fn.

```javascript
var memoize = require("simple-memoizr");

function fn(args) {
	/* ... */
};

var memoized = memoize(fn)

memoized(args);
```

Expire cache after given time in ms

```javascript
memoize(fn).expire(1000*60*60)
```

Limit the cache size

```javascript
memoize(fn).limit(100)
```

Clear the cache

```javascript
memoize(fn).flush()
```

### Tests

<a href="https://browserstack.com">![BrowserStack Logo](https://d98b8t1nnulk5.cloudfront.net/production/images/layout/logo-header.png?1469004780) 
</a>

### License

MIT

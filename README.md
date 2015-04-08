QsUtil.js
=======

QsUtil is a JavaScript Utility Library for web applications.

### Get key-value pairs from a query string or a URL:
```javascript
// all of these return { asdf: '123', xyz: '789' }
QsUtil.queryStringParams('?asdf=123&xyz=789');
QsUtil.queryStringParams('asdf=123&xyz=789');
QsUtil.queryStringParams('http://www.example.com?asdf=123&xyz=789');

// works with arrays, too - this returns { asdf: ['123', '456'], xyz: '789' }
QsUtil.queryStringParams('?asdf%5B%5D=123&asdf%5B%5D=456&xyz=789');
```

### Build a query string from key-value pairs:
```javascript
// returns '?asdf=123&xyz=789'
QsUtil.buildQueryString({ asdf: 123, xyz: 789 });

// works with arrays, too - this returns '?asdf%5B%5D=123&asdf%5B%5D=456&xyz=789'
QsUtil.buildQueryString({ asdf: [123, 456], xyz: 789 });
```

### Update a URL with new query string params
```javascript
// both of these return 'http://www.example.com?asdf%5B%5D=123&asdf%5B%5D=456&xyz=789'
QsUtil.updateQueryString('http://www.example.com', { asdf: [123, 456], xyz: 789 });
QsUtil.updateQueryString('http://www.example.com?something=else', { asdf: [123, 456], xyz: 789 });
```

### Update the current page's URL without changing the page's location
```javascript
// updates the current URL using window.history.replaceState()
QsUtil.replaceLocation('/');
```

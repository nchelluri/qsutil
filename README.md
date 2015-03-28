util.js
=======

Util is a JavaScript Utility Library for web applications.

### Get key-value pairs from a query string:
```javascript
// all of these return { asdf: '123', xyz: '789' }
Util.queryStringParams('?asdf=123&xyz=789');
Util.queryStringParams('asdf=123&xyz=789');
Util.queryStringParams('http://www.example.com?asdf=123&xyz=789');

// works with arrays, too - this returns { asdf: ['123', '456'] }
Util.queryStringParams('?asdf[]=123&asdf[]=456');
```

### Build a query string from key-value pairs:
```javascript
// returns '?asdf=123&xyz=789'
Util.buildQueryString({ asdf: 123, xyz: 789 });

// works with arrays, too - this returns '?asdf[]=123&asdf[]=456&xyz=789'
Util.buildQueryString({ asdf: [123, 456], xyz: 789 });
```

### Update the current page's URL
```javascript
// updates the current URL using window.history.replaceState()
Util.updateUrl('/');
```

### Update a URL with new query string params
```javascript
// both of these return 'http://www.example.com?asdf[]=123&asdf[]=456&xyz=789'
Util.updateQueryString('http://www.example.com', { asdf: [123, 456], xyz: 789 });
Util.updateQueryString('http://www.example.com?something=else', { asdf: [123, 456], xyz: 789 });
```

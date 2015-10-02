QsUtil.js
=======

QsUtil is a JavaScript Utility Library for web applications.

### The Main Draw is removing a parameter from your address bar:

Do you ever create a page where passing in a query string like `?updated=1` displays a UI alert? If the user refreshes
the page, should they see the UI alert again? If not, that's what this library was created to address.

```javascript
// replace the current page's history entry and update the address bar, removing the 'updated' parameter
QsUtil.replaceLocationRemovingParam('updated');
```

All of the other functionality used internally for this purpose is provided in utility functions as well.

### Remove a parameter from a URL:
```javascript
// all of these return 'http://www.example.com?asdf%5B%5D=123&asdf%5B%5D=456'
QsUtil.removeParamFromUrl('http://www.example.com?asdf%5B%5D=123&asdf%5B%5D=456&xyz=789', 'xyz');
QsUtil.removeParamFromUrl('http://www.example.com?asdf%5B%5D=123&asdf%5B%5D=456&xyz%5B%5D=789&xyz%5B%5D=012', 'xyz');
QsUtil.removeParamFromUrl('http://www.example.com?asdf%5B%5D=123&asdf%5B%5D=456', 'xyz');
```

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

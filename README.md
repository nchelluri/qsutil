util.js
=======

Util is a JavaScript Utility Library for web applications.

```javascript
// both of these return { asdf: 123, xyz: 789 }
Util.queryStringParams('?asdf=123&xyz=789');
Util.queryStringParams('asdf=123&xyz=789');

// returns '?asdf=123&xyz=789'
Util.buildQueryString({ asdf: 123, xyz: 789 });

// updates the current URL using window.history.replaceState()
Util.updateUrl('/');
```

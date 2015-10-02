(function() {
  (function() {
    test('queryStringParams: Parsing of QS starting with "?"', function() {
      propEqual(QsUtil.queryStringParams('?asdf=123&xyz=789'), { asdf: '123', xyz: '789' }, 'properties as expected');
    });

    test('queryStringParams: Parsing of QS that does not start with "?"', function() {
      propEqual(QsUtil.queryStringParams('asdf=123&xyz=789'), { asdf: '123', xyz: '789' }, 'properties as expected');
    });

    test('queryStringParams: Parsing of QS with key/value pairs containing "<", ">", "&", "\\"", and "\'" characters', function () {
      propEqual(QsUtil.queryStringParams('paramWith%3C%3E%22\'%26Characters=%3Cscript%3E%22quotes%22%20%26%20\'some-other-entities\'%3C%2Fscript%3E'),
        { 'paramWith<>"\'&Characters': '<script>"quotes" & \'some-other-entities\'</script>' }, 'properties as expected');
    });

    test('queryStringParams: Parsing of a URL without a query string', function() {
      propEqual(QsUtil.queryStringParams('http://localhost:3000/'), { }, 'properties as expected');
    });

    test('queryStringParams: Parsing of a URL with an empty query string', function() {
      propEqual(QsUtil.queryStringParams('http://localhost:3000/?'), { }, 'properties as expected');
    });

    test('queryStringParams: Parsing of a URL with a non-empty query string', function() {
      propEqual(QsUtil.queryStringParams('http://localhost:3000/?asdf=123&xyz=789'), { asdf: '123', xyz: '789' }, 'properties as expected');
    });

    test('queryStringParams: Parsing of an array with one element', function() {
      propEqual(QsUtil.queryStringParams('http://localhost:3000/?asdf%5B%5D=123&xyz=456'), { asdf: ['123'], xyz: '456' }, 'properties as expected');
    });

    test('queryStringParams: Parsing of an array with two elements', function() {
      propEqual(QsUtil.queryStringParams('http://localhost:3000/?asdf%5B%5D=123&asdf%5B%5D=789&xyz=456'), { asdf: ['123', '789'], xyz: '456' }, 'properties as expected');
    });
  })();

  (function() {
    test('buildQueryString: Builds an empty QS from an empty hash of key-value pairs,', function() {
      equal(QsUtil.buildQueryString({}), '', 'string as expected');
    });

    test('buildQueryString: Builds a QS from a hash of string-key-to-string-value pairs', function() {
      equal(QsUtil.buildQueryString({ asdf: 123, xyz: 789 }), '?asdf=123&xyz=789', 'string as expected');
    });

    test('buildQueryString: Builds a QS with key/value pairs containing "<", ">", "&", "\\"", and "\'" characters', function() {
      equal(QsUtil.buildQueryString({ 'paramWith<>"\'&Characters': '<script>"quotes" & \'some-other-entities\'</script>' }),
        '?paramWith%3C%3E%22\'%26Characters=%3Cscript%3E%22quotes%22%20%26%20\'some-other-entities\'%3C%2Fscript%3E',
        'string as expected');
    });

    test('buildQueryString: Builds a QS from a hash of string-key-to-string-array-value pairs, given an array with two elements', function() {
      equal(QsUtil.buildQueryString({ asdf: [123, 456], xyz: 789 }), '?asdf%5B%5D=123&asdf%5B%5D=456&xyz=789', 'string as expected');
    });
  })();

  (function() {
    test('updateQueryString: Updates the query string of a URL with the given key value pairs, when the URL is empty', function() {
      equal(QsUtil.updateQueryString('', { asdf: [123, 456], xyz: 789 }), '?asdf%5B%5D=123&asdf%5B%5D=456&xyz=789', 'string as expected');
    });

    test('updateQueryString: Updates the query string of a URL with the given key value pairs, when the URL has no query string', function() {
      equal(QsUtil.updateQueryString('http://localhost:3000/', { asdf: [123, 456], xyz: 789 }), 'http://localhost:3000/?asdf%5B%5D=123&asdf%5B%5D=456&xyz=789', 'string as expected');
    });

    test('updateQueryString: Updates the query string of a URL with the given key value pairs, when the URL has an existing empty query string', function() {
      equal(QsUtil.updateQueryString('http://localhost:3000/?', { asdf: [123, 456], xyz: 789 }), 'http://localhost:3000/?asdf%5B%5D=123&asdf%5B%5D=456&xyz=789', 'string as expected');
    });

    test('updateQueryString: Updates the query string of a URL with the given key value pairs, when the URL has an existing non-empty query string', function() {
      equal(QsUtil.updateQueryString('http://localhost:3000/?asdf=1&xyz=123', { asdf: [123, 456], xyz: 789 }), 'http://localhost:3000/?asdf%5B%5D=123&asdf%5B%5D=456&xyz=789', 'string as expected');
    });
  })();

  (function() {
    test('replaceLocation: Updates window.location when passed a URL with a non-URL-encoded QS', function() {
      var originalLocationStr = window.location.toString();

      var qsStartIndex = originalLocationStr.indexOf('?');

      var originalBase = qsStartIndex === -1 ? originalLocationStr : originalLocationStr.substr(0, qsStartIndex);

      QsUtil.replaceLocation(originalBase + '?asdf=123&xyz[]=789&xyz[]=012');
      propEqual(QsUtil.queryStringParams(window.location.toString()), { asdf: '123', xyz: ['789','012' ] }, 'window.location as expected');

      QsUtil.replaceLocation(originalLocationStr);
      equal(window.location.toString(), originalLocationStr, 'test destruction as expected');
    });

    test('replaceLocation: Updates window.location when passed a URL with a URL-encoded QS', function() {
      var originalLocationStr = window.location.toString();

      var qsStartIndex = originalLocationStr.indexOf('?');

      var originalBase = qsStartIndex === -1 ? originalLocationStr : originalLocationStr.substr(0, qsStartIndex);

      QsUtil.replaceLocation(originalBase + '?asdf=123&xyz%5B%5D=789&xyz%5B%5D=012');
      propEqual(QsUtil.queryStringParams(window.location.toString()), { asdf: '123', xyz: ['789','012' ] }, 'window.location as expected');

      QsUtil.replaceLocation(originalLocationStr);
      equal(window.location.toString(), originalLocationStr, 'test destruction as expected');
    });
  })();

  (function() {
    test('replaceLocationRemovingParam', function() {
      var originalLocationStr = window.location.toString();

      var qsStartIndex = originalLocationStr.indexOf('?');

      var originalBase = qsStartIndex === -1 ? originalLocationStr : originalLocationStr.substr(0, qsStartIndex);

      QsUtil.replaceLocation(originalBase + QsUtil.buildQueryString({ asdf: 123, xyz: [123, 456], newParam: 'replaceLocationRemovingParam' }));
      propEqual(QsUtil.queryStringParams(window.location.toString()), { asdf: '123', xyz: ['123', '456'], newParam: 'replaceLocationRemovingParam' }, 'test init as expected');

      QsUtil.replaceLocationRemovingParam('newParam');
      equal(window.location.toString(), originalBase + QsUtil.buildQueryString({ asdf: 123, xyz: [123, 456] }), 'string as expected');

      QsUtil.replaceLocation(originalLocationStr);
      equal(window.location.toString(), originalLocationStr, 'test destruction as expected');
    });
  })();

  (function() {
    test('removeParamFromUrl: Returns an unchanged URL when you use it to remove a parameter from a URL without a query string', function() {
      equal(QsUtil.removeParamFromUrl('http://localhost:3000/', 'asdf'), 'http://localhost:3000/', 'string as expected');
    });

    test('removeParamFromUrl: Returns an unchanged URL when you use it to remove a parameter from a URL with an empty query string', function() {
      equal(QsUtil.removeParamFromUrl('http://localhost:3000/?', 'asdf'), 'http://localhost:3000/', 'string as expected');
    });

    test('removeParamFromUrl: Returns an unchanged URL when you use it to remove a parameter from a URL that doesn\'t contain it', function() {
      equal(QsUtil.removeParamFromUrl('http://localhost:3000/?xyz[]=789&xyz[]=012', 'asdf'), 'http://localhost:3000/?xyz%5B%5D=789&xyz%5B%5D=012', 'string as expected');
    });

    test('removeParamFromUrl: Returns a URL without a parameter when the it is removed from the URL and the parameter is an array', function() {
      equal(QsUtil.removeParamFromUrl('http://localhost:3000/?asdf[]=123&asdf=456&xyz[]=789&xyz[]=012&qwerty=uiop', 'asdf'), 'http://localhost:3000/?xyz%5B%5D=789&xyz%5B%5D=012&qwerty=uiop', 'string as expected');
    });

    test('removeParamFromUrl: Returns a URL without a parameter when the it is removed from the URL and the parameter is a scalar', function() {
      equal(QsUtil.removeParamFromUrl('http://localhost:3000/?asdf=123&xyz[]=789&xyz[]=012&qwerty=uiop', 'asdf'), 'http://localhost:3000/?xyz%5B%5D=789&xyz%5B%5D=012&qwerty=uiop', 'string as expected');
    });
  })();
})();

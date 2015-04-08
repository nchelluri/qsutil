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
})();
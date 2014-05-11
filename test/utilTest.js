(function() {
    (function() {
        test('queryStringParams: Parsing of QS starting with "?"', function () {
            propEqual(Util.queryStringParams('?asdf=123&xyz=789'), { asdf: '123', xyz: '789' }, 'properties as expected');
        });

        test('queryStringParams: Parsing of QS that does not start with "?"', function () {
            propEqual(Util.queryStringParams('asdf=123&xyz=789'), { asdf: '123', xyz: '789' }, 'properties as expected');
        });
    })();

    (function() {
        test('buildQueryString: Builds a QS from a hash of string-key-to-string-value pairs', function() {
            equal(Util.buildQueryString({ asdf: 123, xyz: 789 }), '?asdf=123&xyz=789', 'string as expected');
        });
    })();
})();

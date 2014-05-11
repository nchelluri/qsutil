(function() {
    (function() {
        test('queryStringParams: Parsing of QS starting with "?"', function () {
            propEqual(Util.queryStringParams('?asdf=123&xyz=789'), { asdf: '123', xyz: '789' }, 'properties as expected');
        });

        test('queryStringParams: Parsing of QS that does not start with "?"', function () {
            propEqual(Util.queryStringParams('asdf=123&xyz=789'), { asdf: '123', xyz: '789' }, 'properties as expected');
        });

        test('queryStringParams: Parsing of QS with key/value pairs containing "<", ">", "&", "\\"", and "\'" characters', function () {
            propEqual(Util.queryStringParams('paramWith%3C%3E%22\'%26Characters=%3Cscript%3E%22quotes%22%20%26%20\'some-other-entities\'%3C%2Fscript%3E'),
                { 'paramWith<>"\'&Characters': '<script>"quotes" & \'some-other-entities\'</script>' }, 'properties as expected');
        });
    })();

    (function() {
        test('buildQueryString: Builds a QS from a hash of string-key-to-string-value pairs', function() {
            equal(Util.buildQueryString({ asdf: 123, xyz: 789 }), '?asdf=123&xyz=789', 'string as expected');
        });

        test('buildQueryString: Builds a QS with key/value pairs containing "<", ">", "&", "\\"", and "\'" characters', function () {
            equal(Util.buildQueryString({ 'paramWith<>"\'&Characters': '<script>"quotes" & \'some-other-entities\'</script>' }),
                '?paramWith%3C%3E%22\'%26Characters=%3Cscript%3E%22quotes%22%20%26%20\'some-other-entities\'%3C%2Fscript%3E',
                'string as expected');
        });
    })();
})();

var Util = (function() {
    var queryStringParams = function(queryString) {
        var params = {};
        if (queryString.length == 0) {
            return params;
        }

        var indicatorIndex = queryString.indexOf('?');
        if (indicatorIndex !== -1) {
            queryString = queryString.slice(indicatorIndex + 1);
        }

        if (queryString.indexOf('=') !== -1) {
          queryString.split('&').forEach(function(val) {
            var param = val.split('=');
            var key = decodeURIComponent(param[0]);
            var value = decodeURIComponent(param[1]);

            if (key.slice(-2) == '[]') {
              key = key.slice(0, -2);
              if (Array.isArray(params[key])) {
                params[key].push(value);
              } else {
                params[key] = [value];
              }
            } else {
              params[key] = value;
            }
          });
        }

        return params;
    };

    var buildQueryString = function(params) {
        var queryString = '?';

        Object.keys(params).forEach(function(key) {
            if (Array.isArray(params[key])) {
              params[key].forEach(function(value) {
                queryString += encodeURIComponent(key + '[]') + '=' + encodeURIComponent(value) + '&';
              });
            } else {
              queryString += encodeURIComponent(key) + '='  + encodeURIComponent(params[key]) + '&';
            }
        });

        if(queryString[queryString.length - 1] == '&') {
            queryString = queryString.slice(0, -1);
        }

        return queryString;
    };

    // TODO: Write tests for this: need to add a layer of indirection to window and mock it out.
    var updateUrl = function(url) {
        window.history.replaceState({}, '', url);
    };

    var updateQueryString = function(url, params) {
        var queryString = buildQueryString(params);

        var indicatorIndex = url.indexOf('?');
        if (indicatorIndex !== -1) {
          url = url.substring(0, indicatorIndex);
        }

        return url + queryString;
    };

    return {
        queryStringParams: queryStringParams,
        buildQueryString: buildQueryString,
        updateUrl: updateUrl,
        updateQueryString: updateQueryString
    };
}());

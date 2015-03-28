Changelog
=========

## v0.1

- Added test using QUnit
  - Still need one test for `Util.updateUrl()` (see TODO in the code)
- Added URL encoding when building query strings (in `Util.buildQueryString()`)
- Added URL decoding when parsing query strings (in `Util.queryStringParams()`)

## v0.1.1

- Made some changes per code review, functionality remains the same

## v0.1.2

- Added the ability to pass a URL to `Util.queryStringParams()`
- Added the parsing of arrays in query strings (like `?ids[]=1&ids[]=2&ids[]=3`)

## v0.1.3

- Added the ability to update a URL's query string using `Util.updateQueryString()`
- Added the ability to handle arrays when parsing query strings in `Util.queryStringParams()`

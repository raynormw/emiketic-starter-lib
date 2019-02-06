"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var FetchHelper = require('./fetch.helper');
/* eslint-env jest */


var ORIGIN_REGEXP = /^\d+\.\d+\.\d+\.\d+/;
var ENDPOINT = process.env.FETCH_HELPER_TEST_ENDPOINT || 'https://httpbin.org';
test('FetchHelper.toQueryString with empty payload', function () {
  var input = {};
  var output = FetchHelper.toQueryString(input);
  expect(output).toBe('');
});
test('FetchHelper.toQueryString with flat payload', function () {
  var input = {
    null: null,
    boolean1: false,
    boolean2: true,
    number1: 0,
    number2: 1,
    number3: -1,
    string1: 'hello',
    string2: 'world',
    date: new Date('2018-01-01T00:00:00.000Z')
  };
  var output = FetchHelper.toQueryString(input);
  expect(output).toBe('null=null&boolean1=false&boolean2=true&number1=0&number2=1&number3=-1&string1=hello&string2=world&date=2018-01-01T00:00:00.000Z');
});
test('FetchHelper.toQueryString with nested payload', function () {
  var input = {
    array: [null, false, true, 0, 1, -1, 'hello', 'world', new Date('2018-01-01T00:00:00.000Z')],
    object: {
      null: null,
      boolean1: false,
      boolean2: true,
      number1: 0,
      number2: 1,
      number3: -1,
      string1: 'hello',
      string2: 'world',
      date: new Date('2018-01-01T00:00:00.000Z')
    }
  };
  var output = FetchHelper.toQueryString(input);
  expect(output).toBe('array[0]=null&array[1]=false&array[2]=true&array[3]=0&array[4]=1&array[5]=-1&array[6]=hello&array[7]=world&array[8]=2018-01-01T00:00:00.000Z&object[null]=null&object[boolean1]=false&object[boolean2]=true&object[number1]=0&object[number2]=1&object[number3]=-1&object[string1]=hello&object[string2]=world&object[date]=2018-01-01T00:00:00.000Z');
}); // test('FetchHelper.toQueryString with realistic payload', () => {
//   const file = null; // @TODO simulate file
//   const query = FetchHelper.toQueryString({
//     array: [
//       null,
//       false,
//       0,
//       'hello',
//       new Date(),
//       {
//         photo: file || null,
//         legend: 'legend...',
//       },
//     ],
//     object: {
//       null: null,
//       boolean: false,
//       number: 0,
//       string: 'hello',
//       date: new Date(),
//       attachement: {
//         photo: file || null,
//         legend: 'legend...',
//       },
//     },
//   });
//   expect(query).toBe('');
// });

test('FetchHelper.Request', function () {
  var request = FetchHelper.Request('GET', '/user/:userId/profile');
  expect(request.url).toBe('/user/:userId/profile');
});
test('FetchHelper.Request with route params', function () {
  var request = FetchHelper.Request('GET', '/user/:userId/profile', {
    route: {
      userId: '123456789'
    }
  });
  expect(request.url).toBe('/user/123456789/profile');
});
test('FetchHelper.Request with plain object body', function () {
  var body = {
    name: 'John'
  };
  var request = FetchHelper.Request('POST', '/user/:userId/profile', {
    body: body
  });
  expect(request.method).toBe('POST');
  expect(request.url).toBe('/user/:userId/profile');
  expect(request.headers.get('Content-Type')).toBe('application/json');
  expect(request._bodyText).toBe(JSON.stringify(body));
});
test('FetchHelper.Request with FormData body', function () {
  var body = {
    name: 'John'
  };
  var request = FetchHelper.Request('POST', '/user/:userId/profile', {
    body: FetchHelper.toFormData(body)
  });
  expect(request.method).toBe('POST');
  expect(request.url).toBe('/user/:userId/profile');
  expect(request._bodyInit).toBeInstanceOf(FormData);
});
test('FetchHelper.Request with route and query params', function () {
  var request = FetchHelper.Request('GET', '/user/:userId/profile', {
    route: {
      userId: '123456789'
    },
    query: {
      meta: {
        fields: ['name', 'email', 'picture']
      }
    }
  });
  expect(request.method).toBe('GET');
  expect(request.url).toBe('/user/123456789/profile?meta[fields][0]=name&meta[fields][1]=email&meta[fields][2]=picture');
});
/**
 * FetchHelper documentation examples
 */

test('FetchHelper Promise success example', function (done) {
  fetch("".concat(ENDPOINT, "/anything")).then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler).then(function (result) {
    expect(result.origin).toMatch(ORIGIN_REGEXP);
    done();
  }).catch(function (error) {
    return done(error);
  });
});
test('FetchHelper Promise failure example', function (done) {
  fetch("".concat(ENDPOINT, "/status/400")).then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler).catch(function (error) {
    expect(error.code).toBe('Invalid');
    expect(error.message).toBe('Invalid request');
    expect(error.extra.text).toBe('');
    done();
  });
});
test('FetchHelper Promise failure example', function (done) {
  fetch("".concat(ENDPOINT, "/status/401")).then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler).catch(function (error) {
    expect(error.code).toBe('Unauthenticated');
    expect(error.message).toBe('Unauthenticated'); // expect(error.extra.text).toBe(''); // @TODO fix

    done();
  });
});
test('FetchHelper Promise failure example', function (done) {
  fetch("".concat(ENDPOINT, "/status/403")).then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler).catch(function (error) {
    expect(error.code).toBe('Unauthorized');
    expect(error.message).toBe('Unauthorized');
    expect(error.extra.text).toBe('');
    done();
  });
});
test('FetchHelper Promise failure example', function (done) {
  fetch("".concat(ENDPOINT, "/status/404")).then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler).catch(function (error) {
    expect(error.code).toBe('NotFound');
    expect(error.message).toBe('Not found');
    expect(error.extra.text).toBe('');
    done();
  });
});
test('FetchHelper Promise failure example', function (done) {
  fetch("".concat(ENDPOINT, "/status/410")).then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler).catch(function (error) {
    expect(error.code).toBe('Unknown');
    expect(error.message).toBe('Unknown error');
    expect(error.extra.text).toBe('');
    done();
  });
});
test('FetchHelper Promise failure example', function (done) {
  fetch("".concat(ENDPOINT, "/status/500")).then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler).catch(function (error) {
    expect(error.code).toBe('Server');
    expect(error.message).toBe('Server error');
    expect(error.extra.text).toBe('');
    done();
  });
});
test('FetchHelper async/await success example',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var response, result;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return fetch("".concat(ENDPOINT, "/anything"));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return FetchHelper.ResponseHandler(response);

        case 6:
          result = _context.sent;
          expect(result.origin).toMatch(ORIGIN_REGEXP);
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          _context.t0 = FetchHelper.ErrorValueHandler(_context.t0);
          throw _context.t0;

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this, [[0, 10]]);
})));
test('FetchHelper async/await failure example',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee2() {
  var response, result;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return fetch("".concat(ENDPOINT, "/status/400"));

        case 3:
          response = _context2.sent;
          _context2.next = 6;
          return FetchHelper.ResponseHandler(response);

        case 6:
          result = _context2.sent;
          _context2.next = 15;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          _context2.t0 = FetchHelper.ErrorValueHandler(_context2.t0);
          expect(_context2.t0.code).toBe('Invalid');
          expect(_context2.t0.message).toBe('Invalid request');
          expect(_context2.t0.extra.text).toBe('');

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this, [[0, 9]]);
})));
test('FetchHelper.toQueryString example', function (done) {
  fetch("".concat(ENDPOINT, "/anything?").concat(FetchHelper.toQueryString({
    a: 1,
    b: 2
  }))).then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler).then(function (result) {
    expect(result.origin).toMatch(ORIGIN_REGEXP);
    expect(result.args).toEqual({
      a: '1',
      b: '2'
    });
    done();
  }).catch(function (error) {
    return done(error);
  });
});
test('FetchHelper.toFormData example', function (done) {
  fetch("".concat(ENDPOINT, "/anything"), {
    method: 'POST',
    body: FetchHelper.toFormData({
      a: 1,
      b: 2
    })
  }).then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler).then(function (result) {
    expect(result.origin).toMatch(ORIGIN_REGEXP);
    expect(result.form).toEqual({
      a: '1',
      b: '2'
    });
    done();
  }).catch(function (error) {
    return done(error);
  });
});
test('FetchHelper.Request example', function (done) {
  fetch(FetchHelper.Request('POST', "".concat(ENDPOINT, "/anything/:token"), {
    route: {
      token: '123456789'
    },
    query: {
      a: 1,
      b: 2
    },
    body: {
      a: 1,
      b: 2
    }
  })).then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler).then(function (result) {
    expect(result.origin).toMatch(ORIGIN_REGEXP);
    expect(result.url).toBe("".concat(ENDPOINT, "/anything/123456789?a=1&b=2"));
    expect(result.args).toEqual({
      a: '1',
      b: '2'
    });
    expect(result.json).toEqual({
      a: 1,
      b: 2
    });
    done();
  }).catch(function (error) {
    return done(error);
  });
});
//# sourceMappingURL=fetch.helper.test.js.map
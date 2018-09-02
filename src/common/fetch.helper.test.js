const FetchHelper = require('./fetch.helper');

/* eslint-env jest */

const ORIGIN_REGEXP = /^\d+\.\d+\.\d+\.\d+/;

const ENDPOINT = process.env.FETCH_HELPER_TEST_ENDPOINT || 'https://httpbin.org';

test('FetchHelper.toQueryString with empty payload', () => {
  const input = {};

  const output = FetchHelper.toQueryString(input);

  expect(output).toBe('');
});

test('FetchHelper.toQueryString with flat payload', () => {
  const input = {
    null: null,
    boolean1: false,
    boolean2: true,
    number1: 0,
    number2: 1,
    number3: -1,
    string1: 'hello',
    string2: 'world',
    date: new Date('2018-01-01T00:00:00.000Z'),
  };

  const output = FetchHelper.toQueryString(input);

  expect(output).toBe(
    'null=null&boolean1=false&boolean2=true&number1=0&number2=1&number3=-1&string1=hello&string2=world&date=2018-01-01T00:00:00.000Z',
  );
});

test('FetchHelper.toQueryString with nested payload', () => {
  const input = {
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
      date: new Date('2018-01-01T00:00:00.000Z'),
    },
  };

  const output = FetchHelper.toQueryString(input);

  expect(output).toBe(
    'array[0]=null&array[1]=false&array[2]=true&array[3]=0&array[4]=1&array[5]=-1&array[6]=hello&array[7]=world&array[8]=2018-01-01T00:00:00.000Z&object[null]=null&object[boolean1]=false&object[boolean2]=true&object[number1]=0&object[number2]=1&object[number3]=-1&object[string1]=hello&object[string2]=world&object[date]=2018-01-01T00:00:00.000Z',
  );
});

// test('FetchHelper.toQueryString with realistic payload', () => {
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

test('FetchHelper.Request', () => {
  const request = FetchHelper.Request('GET', '/user/:userId/profile');

  expect(request.url).toBe('/user/:userId/profile');
});

test('FetchHelper.Request with route params', () => {
  const request = FetchHelper.Request('GET', '/user/:userId/profile', {
    route: { userId: '123456789' },
  });

  expect(request.url).toBe('/user/123456789/profile');
});

test('FetchHelper.Request with plain object body', () => {
  const body = {
    name: 'John',
  };

  const request = FetchHelper.Request('POST', '/user/:userId/profile', {
    body,
  });

  expect(request.method).toBe('POST');

  expect(request.url).toBe('/user/:userId/profile');

  expect(request.headers.get('Content-Type')).toBe('application/json');

  expect(request._bodyText).toBe(JSON.stringify(body));
});

test('FetchHelper.Request with FormData body', () => {
  const body = new FormData();
  body.append('name', 'John');

  const request = FetchHelper.Request('POST', '/user/:userId/profile', {
    body,
  });

  expect(request.method).toBe('POST');

  expect(request.url).toBe('/user/:userId/profile');

  // expect(request.headers.get('Content-Type')).toBe(...);

  // expect(request._bodyText).toBe('');
});

test('FetchHelper.Request with route and query params', () => {
  const request = FetchHelper.Request('GET', '/user/:userId/profile', {
    route: { userId: '123456789' },
    query: { meta: { fields: ['name', 'email', 'picture'] } },
  });

  expect(request.method).toBe('GET');

  expect(request.url).toBe(
    '/user/123456789/profile?meta[fields][0]=name&meta[fields][1]=email&meta[fields][2]=picture',
  );
});

/**
 * FetchHelper documentation examples
 */

test('FetchHelper Promise success example', (done) => {
  fetch(`${ENDPOINT}/anything`)
    .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
    .then((result) => {
      expect(result.origin).toMatch(ORIGIN_REGEXP);
      done();
    })
    .catch((error) => done(error));
});

test('FetchHelper Promise failure example', (done) => {
  fetch(`${ENDPOINT}/status/400`)
    .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
    .catch((error) => {
      expect(error.code).toBe('Invalid');
      expect(error.message).toBe('Invalid request');
      expect(error.extra.text).toBe('');
      done();
    });
});

test('FetchHelper Promise failure example', (done) => {
  fetch(`${ENDPOINT}/status/401`)
    .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
    .catch((error) => {
      expect(error.code).toBe('Unauthenticated');
      expect(error.message).toBe('Unauthenticated');
      // expect(error.extra.text).toBe(''); // @TODO fix
      done();
    });
});

test('FetchHelper Promise failure example', (done) => {
  fetch(`${ENDPOINT}/status/403`)
    .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
    .catch((error) => {
      expect(error.code).toBe('Unauthorized');
      expect(error.message).toBe('Unauthorized');
      expect(error.extra.text).toBe('');
      done();
    });
});

test('FetchHelper Promise failure example', (done) => {
  fetch(`${ENDPOINT}/status/404`)
    .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
    .catch((error) => {
      expect(error.code).toBe('NotFound');
      expect(error.message).toBe('Not found');
      expect(error.extra.text).toBe('');
      done();
    });
});

test('FetchHelper Promise failure example', (done) => {
  fetch(`${ENDPOINT}/status/410`)
    .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
    .catch((error) => {
      expect(error.code).toBe('Unknown');
      expect(error.message).toBe('Unknown error');
      expect(error.extra.text).toBe('');
      done();
    });
});

test('FetchHelper Promise failure example', (done) => {
  fetch(`${ENDPOINT}/status/500`)
    .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
    .catch((error) => {
      expect(error.code).toBe('Server');
      expect(error.message).toBe('Server error');
      expect(error.extra.text).toBe('');
      done();
    });
});

test('FetchHelper async/await success example', async () => {
  try {
    const response = await fetch(`${ENDPOINT}/anything`);
    const result = await FetchHelper.ResponseHandler(response);

    expect(result.origin).toMatch(ORIGIN_REGEXP);
  } catch (error) {
    error = FetchHelper.ErrorValueHandler(error);

    throw error;
  }
});

test('FetchHelper async/await failure example', async () => {
  try {
    const response = await fetch(`${ENDPOINT}/status/400`);
    const result = await FetchHelper.ResponseHandler(response);

    console.log(result);
  } catch (error) {
    error = FetchHelper.ErrorValueHandler(error);

    expect(error.code).toBe('Invalid');
    expect(error.message).toBe('Invalid request');
    expect(error.extra.text).toBe('');
  }
});

test('FetchHelper.toQueryString example', (done) => {
  fetch(`${ENDPOINT}/anything?${FetchHelper.toQueryString({ a: 1, b: 2 })}`)
    .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
    .then((result) => {
      expect(result.origin).toMatch(ORIGIN_REGEXP);
      expect(result.args).toEqual({ a: '1', b: '2' });
      done();
    })
    .catch((error) => done(error));
});

test('FetchHelper.toFormData example', (done) => {
  fetch(`${ENDPOINT}/anything`, {
    method: 'POST',
    body: FetchHelper.toFormData({ a: 1, b: 2 }),
  })
    .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
    .then((result) => {
      expect(result.origin).toMatch(ORIGIN_REGEXP);
      expect(result.form).toEqual({ a: '1', b: '2' });
      done();
    })
    .catch((error) => done(error));
});

test('FetchHelper.Request example', (done) => {
  fetch(
    FetchHelper.Request('POST', `${ENDPOINT}/anything/:token`, {
      route: { token: '123456789' },
      query: { a: 1, b: 2 },
      body: { a: 1, b: 2 },
    }),
  )
    .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
    .then((result) => {
      expect(result.origin).toMatch(ORIGIN_REGEXP);
      expect(result.url).toBe(`${ENDPOINT}/anything/123456789?a=1&b=2`);
      expect(result.args).toEqual({ a: '1', b: '2' });
      expect(result.json).toEqual({ a: 1, b: 2 });
      done();
    })
    .catch((error) => done(error));
});

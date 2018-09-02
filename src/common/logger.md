# Logger

## Usage

Put the following in `./common/logger.js` (and make sure to load this file as early as possible)

```javascript
import * as Logger from 'emiketic-starter-lib/dist/common/logger';

Logger.setup('HelloWorld');

if (process.env.NODE_ENV === 'development') {
  Logger.enable('HelloWorld*');
}
```

Then use it as follows:

```javascript
import * as Logger from 'emiketic-starter-lib/dist/common/logger';

Logger.debug('test');
// prints `HelloWorld DEBUG +0ms test` to stdout

Logger.info('test');
// prints `HelloWorld INFO +0ms test` to stdout

Logger.warn('test');
// prints `HelloWorld WARN +0ms test` to stderr

Logger.error('test');
// prints `HelloWorld ERROR +0ms test` to stderr
```

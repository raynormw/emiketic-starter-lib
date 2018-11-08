# Logger

## Usage

Put the following in `./common/logger.js` (and make sure to load this file as early as possible)

```javascript
import * as Logger from 'starter-lib/dist/common/logger';

Logger.setup('Starter');

if (process.env.NODE_ENV === 'development') {
  Logger.enable('Starter*');
}
```

Then use it as follows:

```javascript
import * as Logger from 'starter-lib/dist/common/logger';

Logger.debug('test');
// prints `Starter DEBUG +0ms test` to stdout

Logger.info('test');
// prints `Starter INFO +0ms test` to stdout

Logger.warn('test');
// prints `Starter WARN +0ms test` to stderr

Logger.error('test');
// prints `Starter ERROR +0ms test` to stderr
```

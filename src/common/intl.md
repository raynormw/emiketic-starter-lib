# INTL (Internationalization and Localization)

## Usage

```javascript
import { $t } from 'starter-lib/dist/common/intl';

$t('Log in');
// return translated text

$t('Your event "%{}" have %{} subscribers', event.title, event.subscribersCount);
// return translated text

$t('Last connection %{}', date);
// return translated text

$t.number(event.subscribersCount);
// return localized number

$t.currency(event.subscriptionFee);
// return localized number with currency

$t.date(new Date());
// return localized date

$t.time(new Date());
// return localized time

$t.timestamp(new Date());
// return localized timestamp
```

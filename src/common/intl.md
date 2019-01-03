# INTL (Internationalization and Localization)

## Usage

```javascript
import { $locale } from 'starter-lib/dist/common/intl';

$locale.$t('Log in');
// return translated text

$locale.$t('Your event "%{}" have %{} subscribers', event.title, event.subscribersCount);
// return translated text

$locale.$t('Last connection %{}', date);
// return translated text

$locale.number(event.subscribersCount);
// return localized number

$locale.currency(event.subscriptionFee);
// return localized number with currency

$locale.date(new Date());
// return localized date

$locale.time(new Date());
// return localized time

$locale.timestamp(new Date());
// return localized timestamp
```

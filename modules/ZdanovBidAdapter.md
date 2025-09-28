# Zdanov Bid Adapter

## Описание

Адаптер `ZdanovBidAdapter` реализует взаимодействие с Prebid.js и позволяет участвовать в аукционе баннерной рекламы.  
Он поддерживает медиа-тип `BANNER` и умеет валидировать запросы, строить серверные запросы и обрабатывать ответы.

---

## Установка

1. Скопируйте файл `ZdanovBidAdapter.js` в папку `modules/` вашего Prebid.js.
2. Зарегистрируйте адаптер с помощью `registerBidder(spec)`:
```js
import { spec } from './modules/ZdanovBidAdapter';
// Проверка валидного запроса
const bid = { bidId: '123', params: { placementId: 'abc' }, sizes: [[300,250]] };
console.log(spec.isBidRequestValid(bid)); // true

// Формирование запроса
const request = spec.buildRequests([bid]);
console.log(request.url, request.data);

// Обработка ответа сервера
const response = { body: [{ cpm: 1.5, width: 300, height: 250, creativeId: 'c1', ad: '<div>Ad</div>', currency: 'USD' }] };
const bidResponses = spec.interpretResponse(response, request);
console.log(bidResponses);

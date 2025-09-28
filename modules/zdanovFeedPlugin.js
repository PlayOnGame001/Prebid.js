const FEED_URL = 'https://prebid.zhdanov.ua/feeds';
const UPDATE_INTERVAL = 15 * 60 * 1000; // 15 минут

export function loadZdanovFeed() {
  fetch(FEED_URL)
    .then(res => res.json())
    .then(data => {
      window.zdanovFeedData = data;
      console.log('✅ Feed updated:', data);
    })
    .catch(err => console.error('❌ Feed fetch error:', err));
}
loadZdanovFeed();
setInterval(loadZdanovFeed, UPDATE_INTERVAL);

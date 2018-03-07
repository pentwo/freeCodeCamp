const endPoint = 'https://cors.io/?https://trackobot.com/profile/history.json?username=billowing-tundra-rhino-8650&token=qQFiFeW_5xXmTMn2cpMY';
const endPoint1 = 'http://wesbos.com/wp-json/wp/v2/posts';
const endPoint2 = 'http://data.ratp.fr/api/datasets/1.0/search/?q=paris';
const endPoint3 = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRFmHDBCaiR8ycYIwywqmJrmEAV0DzD-i79zMGrGdQpq-r7xeUYCicvYqBoPdRFgTM7mGv5ayU7phsm/pubhtml';
const endPoint4 = 'https://cors.io/?https://spreadsheets.google.com/feeds/list/2PACX-1vRFmHDBCaiR8ycYIwywqmJrmEAV0DzD-i79zMGrGdQpq-r7xeUYCicvYqBoPdRFgTM7mGv5ayU7phsm/od6/public/values?alt=json-in-script&callback=';
const endPoint5 = 'https://cors.io/?https://spreadsheets.google.com/feeds/list/2PACX-1vRFmHDBCaiR8ycYIwywqmJrmEAV0DzD-i79zMGrGdQpq-r7xeUYCicvYqBoPdRFgTM7mGv5ayU7phsm/od6/public/values?alt=json';

const endPoint6 = 'https://github-pages-8139a.firebaseio.com/games.json'

const pw = 'billowing-tundra-rhino-8650:qQFiFeW_5xXmTMn2cpMY';


const history = fetch(
  endPoint6,
  {
    method: 'GET',

    headers: {
      // Authorization: `Basic ${pw}`,
      'Content-Type': 'application/json',
      // 'username': 'billowing-tundra-rhino-8650',
      // 'token': 'qQFiFeW_5xXmTMn2cpMY',
    },
    mode: 'cors',
    cache: 'default',
  },
);

history
  .then(data => data.json())
  .then(data => console.log(data));


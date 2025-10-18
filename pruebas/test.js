import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 200,
  duration: '60s',
};

export default function () {
  http.get('https://victorious-grass-044215e03.6.azurestaticapps.net/');
  sleep(1);
}
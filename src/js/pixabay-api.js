import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '51587932-ec02964f1d63236ab83378a4f';

export function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(res => res.data)
    .catch(err => {
      console.error('Pixabay API Error:', err);
      throw err;
    });
}

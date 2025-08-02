import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './css/styles.css';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');

form.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();

  const query = input.value.trim();
  if (!query) {
    iziToast.warning({
      title: '',
      message: 'Please enter a search query.',
      position: 'topRight',
      messageColor: '#fff',
      color: '#ef4040',
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: '',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          messageColor: '#fff',
          color: '#ef4040',
        });
        return;
      }

      createGallery(data.hits);
    })
    .catch(() => {
      iziToast.error({
        title: '',
        message: 'Something went wrong. Try again later.',
        position: 'topRight',
        messageColor: '#fff',
        color: '#ef4040',
      });
    })
    .finally(() => {
      hideLoader();
    });
}

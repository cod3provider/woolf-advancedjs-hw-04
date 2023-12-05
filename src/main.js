import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './api/fetch-api.js';
import { createMarkup } from './api/createMarkup.js';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

function errorToast () {
  iziToast.error({
    position: 'topRight',
    title: 'Error',
    message: 'Sorry, there are no images matching your search query. Please try again.'
  });
}

function onHandleSubmit(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  const query = e.currentTarget.elements.searchQuery.value.trim();

    fetchImages(query)
    .then(data => {
      console.log(data);

      if (!data.hits.length) {
        errorToast()
      }

      const markup = createMarkup(data.hits);
      // console.log(markup);

      gallery.insertAdjacentHTML('afterbegin', markup);
    })
    .catch(err => {
      console.log(err);
    });
  // } catch(err) {
  //   console.log(err);
  // }
}




form.addEventListener('submit', onHandleSubmit);
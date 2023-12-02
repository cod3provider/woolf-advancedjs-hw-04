import { fetchImages } from './api/fetch-api.js';
import { createMarkup } from './api/createMarkup.js';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');


function onHandleSubmit(e) {
  e.preventDefault();
  // gallery.innerHTML = '';

  const formData = new FormData(e.currentTarget);
  const data = {};

  formData.forEach((value, name) => {
    data[name] = value;
  });

  fetchImages(data)
  .then(data => {
    console.log(data);
    const markup = createMarkup(data.hits);
    console.log(markup);
    gallery.insertAdjacentHTML('afterbegin', markup);
  })
  .catch(err => console.log(err));
}



form.addEventListener('submit', onHandleSubmit);
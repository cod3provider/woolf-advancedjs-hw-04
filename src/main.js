import { fetchImages } from './api/fetch-api.js';

const form = document.querySelector('.search-form');

function onHandleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const data = {};

  formData.forEach((value, name) => {
    data[name] = value;
  });

  fetchImages(data)
  .then(data => console.log(data))
  .catch(err => console.log(err));
}

form.addEventListener('submit', onHandleSubmit);
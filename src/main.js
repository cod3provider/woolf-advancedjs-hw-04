import { fetchImages } from './api/fetch-api.js';

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

function createMarkup(arr) {
  return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
      return `
    <div class='photo-card'>
      <img src='${webformatURL}' alt='${tags}' loading='lazy' />
      <div class='info'>
        <p class='info-item'>
          <b>Likes</b>
          ${likes}
        </p>
        <p class='info-item'>
          <b>Views</b>
          ${views}
        </p>
        <p class='info-item'>
          <b>Comments</b>
          ${comments}
        </p>
        <p class='info-item'>
          <b>Downloads</b>
          ${downloads}
        </p>
      </div>
    </div>
  `;
    }
  )
}

form.addEventListener('submit', onHandleSubmit);
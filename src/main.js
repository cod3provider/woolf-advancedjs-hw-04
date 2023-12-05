
import { fetchImages } from './api/fetch-api.js';
import { createMarkup } from './api/createMarkup.js';
import { errorToast } from './api/errorToast.js';
import iziToast from 'izitoast';
import { PER_PAGE } from './api/keys.js';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const searchBtn = document.querySelector('.search-button');
const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.classList.add('hidden');

let numberPage = 1;
let existSearchQuery;

function onHandleSubmit(e) {
  e.preventDefault();
  loadMoreBtn.classList.add('hidden');
  const query = e.currentTarget.elements.searchQuery.value.trim();

  if (query === existSearchQuery) {
    iziToast.info({ message: "❗️For an another search, enter new query!" });
    return;
  }
  gallery.innerHTML = '';
  existSearchQuery = query;

  fetchImages(query, numberPage)
  .then(data => {
    console.log(data);

    if (!data.totalHits) {
      errorToast();
      return;
    }

    if (numberPage === 1) {
      iziToast.success({message: `Hooray! We found ${data.totalHits} images.`})
    }

    if (data.totalHits <= numberPage * PER_PAGE) {
      iziToast.info({ message: 'We\'re sorry, but you\'ve reached the end of search results.' });
    }

    if (data.totalHits > numberPage * PER_PAGE) {
      loadMoreBtn.classList.remove('hidden');
    }
    const markup = createMarkup(data.hits);
    gallery.insertAdjacentHTML('afterbegin', markup);
  })
  .catch(err => {
    console.log(err);
  });
}


form.addEventListener('submit', onHandleSubmit);
loadMoreBtn.addEventListener('click', loadMore);

export async function loadMore() {
  numberPage += 1;
  // console.log(numberPage);

  const searchQuery = form.elements.searchQuery.value.trim();
  const data = await fetchImages(searchQuery, numberPage + 1);

  gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
  loadMoreBtn.classList.remove('hidden');
}
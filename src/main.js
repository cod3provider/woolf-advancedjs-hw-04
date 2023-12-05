import SimpleLightbox from "simplelightbox";
import { fetchImages } from './api/fetch-api.js';
import { createMarkup } from './api/createMarkup.js';
import { endOfResultsInfo, toastError, toastFoundedImages, toastInfoSearch } from './api/toasts.js';
import { PER_PAGE } from './api/keys.js';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
// const searchBtn = document.querySelector('.search-button');
const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.classList.add('hidden');

let numberPage = 1;
let existSearchQuery;

function onHandleSubmit(e) {
  e.preventDefault();
  loadMoreBtn.classList.add('hidden');
  const query = e.currentTarget.elements.searchQuery.value.trim();

  if (query === existSearchQuery) {
    toastInfoSearch();
    return;
  }
  gallery.innerHTML = '';
  existSearchQuery = query;

  fetchImages(query, numberPage)
  .then(data => {
    console.log(data);

    if (!data.totalHits) {
      toastError();
      return;
    }

    if (numberPage === 1) {
      toastFoundedImages(data);
    }

    if (data.totalHits <= numberPage * PER_PAGE) {
      endOfResultsInfo();
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

const lightbox = new SimpleLightbox(`${gallery}`, { /* options */ });
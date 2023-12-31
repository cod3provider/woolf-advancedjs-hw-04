import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './api/fetch-api.js';
import { createMarkup } from './api/createMarkup.js';
import { endOfResultsInfo, toastEnterSearch, toastError, toastFoundedImages, toastInfoSearch } from './api/toasts.js';
import { PER_PAGE } from './api/keys.js';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.classList.add('hidden');

let numberPage = 1;
let existSearchQuery;
let lightbox;
let isLoading = false;

form.addEventListener('submit', onHandleSubmit);
loadMoreBtn.addEventListener('click', loadMore);

async function onHandleSubmit(e) {
  e.preventDefault();
  loadMoreBtn.classList.add('hidden');
  const query = e.currentTarget.elements.searchQuery.value.trim();
  numberPage = 1;
  let data;

  if (query === '') {
    toastEnterSearch();
    return;
  }

  if (query === existSearchQuery) {
    toastInfoSearch();
    return;
  }
  gallery.innerHTML = '';
  existSearchQuery = query;

  try {
    data = await fetchImages(query, numberPage);
  }
  catch (err) {
    console.log(err);
  }

  if (!data.totalHits) {
    toastError();
    return;
  }

  if (numberPage === 1) {
    toastFoundedImages(data);
  }
    console.log(numberPage * PER_PAGE);
  console.log(data.totalHits);

  if (data.totalHits <= numberPage * PER_PAGE) {
    endOfResultsInfo();
  }

  if (data.totalHits > numberPage * PER_PAGE) {
    loadMoreBtn.classList.remove('hidden');
  }
  const markup = createMarkup(data.hits);
  gallery.insertAdjacentHTML('afterbegin', markup);
  lightbox = new SimpleLightbox(`.gallery a`);
}

export async function loadMore() {
  if (isLoading) {
    return;
  }

  isLoading = true;
  const searchQuery = form.elements.searchQuery.value.trim();
  const data = await fetchImages(searchQuery, numberPage += 1);
  gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
  lightbox.refresh();
  loadMoreBtn.classList.remove('hidden');

  if (data.totalHits <= numberPage * PER_PAGE) {
    loadMoreBtn.classList.add('hidden');
    endOfResultsInfo();
  }

  const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });

  isLoading = false;
}
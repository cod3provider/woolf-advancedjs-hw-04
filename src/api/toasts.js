import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function toastError () {
  iziToast.error({
    position: 'topRight',
    message: 'Sorry, there are no images matching your search query. Please try again.'
  });
}

export function toastEnterSearch() {
  iziToast.warning({
    position: 'topRight',
    message: 'You need enter your request query'
  })
}

export function toastInfoSearch() {
  iziToast.info({
    position: 'topRight',
    message: "❗️For an another search, enter new query!"
  });
}

export function toastFoundedImages(data) {
  iziToast.success({
    position: 'topRight',
    message: `Hooray! We found ${data.totalHits} images.`
  })
}

export function endOfResultsInfo() {
  iziToast.info({
    position: 'topRight',
    message: 'We\'re sorry, but you\'ve reached the end of search results.'
  });
}
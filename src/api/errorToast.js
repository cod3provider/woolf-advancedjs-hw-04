import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function errorToast () {
  iziToast.error({
    position: 'topRight',
    message: 'Sorry, there are no images matching your search query. Please try again.'
  });
}
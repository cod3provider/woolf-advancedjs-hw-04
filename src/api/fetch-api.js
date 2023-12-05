import axios from 'axios';
import { API_KEY, BASE_URL, PAGINATION } from './keys.js';

export const fetchImages = async (query) => {
  const res = await axios(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&${PAGINATION}`);
  return res.data;
}
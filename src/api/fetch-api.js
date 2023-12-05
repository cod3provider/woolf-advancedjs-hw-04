import axios from 'axios';
import { API_KEY, BASE_URL, PER_PAGE } from './keys.js';

export const fetchImages = async (query, page) => {
  const res = await axios(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: PER_PAGE,
    },
  });
  return res.data;
};

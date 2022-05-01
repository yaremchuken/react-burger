import { API_URL, INGREDIENTS_PATH, ORDERS_PATH } from '../utils/constants';

export const fetchIngredients = () => {
  return request(`${API_URL}${INGREDIENTS_PATH}`);
};

export const sendTakeOrder = (ingredients) => {
  return request(`${API_URL}${ORDERS_PATH}`, { ingredients });
};

const request = (url, body) => {
  return fetch(
    url,
    body && {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  ).then(checkResponse);
};

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Что-то пошло не так ${response.status}`);
};

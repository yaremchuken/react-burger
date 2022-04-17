export const random = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const request = (url, body) => {
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

export const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Что-то пошло не так ${response.status}`);
};

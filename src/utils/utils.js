export const random = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

let uniqueId = 0;
export const uniqueIdProvider = () => {
  return uniqueId++;
};

export const setCookie = (name, value, lifetimeSecs) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + lifetimeSecs * 1000);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
};

export const getCookie = (name) => {
  const cookies = document.cookie.split(';');
  let value = undefined;
  cookies.forEach((cookie) => {
    const split = cookie.split('=');
    if (split[0] === name) {
      value = split[1];
      return;
    }
  });
  return value;
};

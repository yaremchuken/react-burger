import { ACCESS_TOKEN_COOKIE_PATH, ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LOCAL_PATH } from './constants';

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

export const persistTokens = (accessToken, refreshToken) => {
  setCookie(ACCESS_TOKEN_COOKIE_PATH, accessToken, ACCESS_TOKEN_LIFETIME);
  localStorage.setItem(REFRESH_TOKEN_LOCAL_PATH, refreshToken);
};

export const dropTokens = () => {
  setCookie(ACCESS_TOKEN_COOKIE_PATH, '', 0);
  localStorage.removeItem(REFRESH_TOKEN_LOCAL_PATH);
};

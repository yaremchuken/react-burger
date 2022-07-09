import { Ingredient } from '../models/Ingredient';
import { Order } from '../models/Order';
import { ACCESS_TOKEN_COOKIE_PATH, ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LOCAL_PATH } from './constants';

export const setCookie = (name: string, value: string, lifetimeSecs: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + lifetimeSecs * 1000);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
};

export const getCookie = (name: string) => {
  const cookies = document.cookie.split(';');
  let value = '';
  cookies.forEach((cookie) => {
    const split = cookie.split('=');
    if (split[0] === name) {
      value = split[1];
      return;
    }
  });
  return value;
};

export const persistTokens = (accessToken: string, refreshToken: string) => {
  setCookie(ACCESS_TOKEN_COOKIE_PATH, accessToken, ACCESS_TOKEN_LIFETIME);
  localStorage.setItem(REFRESH_TOKEN_LOCAL_PATH, refreshToken);
};

export const dropTokens = () => {
  setCookie(ACCESS_TOKEN_COOKIE_PATH, '', 0);
  localStorage.removeItem(REFRESH_TOKEN_LOCAL_PATH);
};

export const mapOrderStatus = (order: Order) => {
  switch (order.status) {
    case 'created':
      return 'Создан';
    case 'pending':
      return 'Готовится';
    case 'done':
      return 'Выполнен';
    default:
      throw new Error(`Unknown order status ${order.status}`);
  }
};

export const dateString = (createdAt: string) => {
  const created = new Date(createdAt);
  const dayDiff = daysAgo(created);

  let daysOffset =
    dayDiff === 0 ? 'Сегодня' : dayDiff === 1 ? 'Вчера' : `${dayDiff} ${dayDiff < 5 ? 'дня' : 'дней'} назад`;

  return `${daysOffset}, ${pad(created.getHours())}:${pad(created.getMinutes())} i-GMT+3`;
};

const daysAgo = (checkDay: Date) => {
  let dayStart = new Date();
  dayStart.setUTCHours(0, 0, 0, 0);

  return Math.ceil((dayStart.getTime() - checkDay.getTime()) / 1000 / 60 / 60 / 24);
};

const pad = (amount: number) => {
  return amount.toString().padStart(2, '0');
};

export const getTotal = (ingredients: ReadonlyArray<Ingredient>) => {
  return ingredients.map((i) => i.price).reduce((total, price) => (total += price), 0);
};

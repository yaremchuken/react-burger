export const random = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

let uniqueId = 0;
export const uniqueIdProvider = () => {
  return uniqueId++;
};

const storage = sessionStorage;

export const setItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};

export const getItem = (key) => {
  return JSON.parse(storage.getItem(key));
};

export const removeItem = (key) => {
  storage.removeItem(key);
};

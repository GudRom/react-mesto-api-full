export const BASE_URL = "http://api.themestechko.students.nomoredomains.work";

const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const checkResult = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      email,
      password,
    }),
  })
  .then(checkResult);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ email, password }),
  })
  .then(checkResult);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      ...HEADERS,
      Authorization: `Bearer ${token}`,
    },
  })
  .then(checkResult);
};

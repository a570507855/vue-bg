const tokenKey = 'token';

export function getToken() {
  return sessionStorage.getItem(tokenKey);
}

export function setToken(token) {
  sessionStorage.setItem(tokenKey, token);
}

export function removeToken() {
  sessionStorage.removeItem(tokenKey);
}
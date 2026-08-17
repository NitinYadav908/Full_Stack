import { decodeToken, isTokenExpired } from "./jwt";

const TOKEN_KEY = "jwt_auth_token";

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getCurrentUser() {
  const token = getToken();

  if (!token || isTokenExpired(token)) {
    removeToken();
    return null;
  }

  return decodeToken(token);
}

export function isAuthenticated() {
  return getCurrentUser() !== null;
}
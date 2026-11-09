import { jwtDecode } from "jwt-decode";

const SECRET = "JWT-DEMO-SECRET";

function base64Encode(data) {
  return btoa(JSON.stringify(data))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function createSignature(header, payload) {
  const text = `${header}.${payload}.${SECRET}`;

  let hash = 0;

  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash).toString(16);
}

export function generateToken(user) {
  const header = base64Encode({
    alg: "HS256",
    typ: "JWT",
  });

  const payload = base64Encode({
    userId: user.id,
    username: user.username,
    role: user.role,
    name: user.name,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
  });

  const signature = createSignature(header, payload);

  return `${header}.${payload}.${signature}`;
}

export function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function isTokenExpired(token) {
  const decoded = decodeToken(token);

  if (!decoded?.exp) {
    return true;
  }

  return decoded.exp * 1000 < Date.now();
}
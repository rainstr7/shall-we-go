import jwt from 'jsonwebtoken';

// Секретный ключ для подписи JWT (в продакшене должен быть в переменных окружения)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = '7d'; // Токен действует 7 дней

export interface JWTPayload {
  userId: number;
  email: string;
  iat?: number;
  exp?: number;
}

// Создание JWT токена
export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

// Проверка и декодирование JWT токена
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

// Извлечение токена из заголовка Authorization (для совместимости)
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7); // Убираем 'Bearer '
}

// Извлечение токена из cookies
export function extractTokenFromCookies(request: Request): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split('=');
    acc[name] = value;
    return acc;
  }, {} as Record<string, string>);
  
  return cookies.auth_token || null;
}

// Middleware для проверки авторизации (приоритет cookies, потом Authorization header)
export function requireAuth(request: Request): JWTPayload | null {
  // Сначала пробуем получить токен из cookies
  let token = extractTokenFromCookies(request);
  
  // Если нет в cookies, пробуем Authorization header (для совместимости)
  if (!token) {
    const authHeader = request.headers.get('authorization');
    token = extractTokenFromHeader(authHeader);
  }
  
  if (!token) {
    return null;
  }
  
  return verifyToken(token);
}

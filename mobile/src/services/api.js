// Altere para o IP local da sua máquina ao rodar com Expo Go em dispositivo físico
const BASE_URL = 'http://192.168.0.10:3000/api';
const TIMEOUT_MS = 10000;

async function request(method, endpoint, body = null, token = null) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Erro na requisição');
    return json;
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Tempo esgotado. Verifique sua conexão e tente novamente.');
    }
    if (err.message === 'Network request failed') {
      throw new Error('Sem conexão com o servidor. Verifique se o backend está rodando.');
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  // Auth
  login: (email, senha) =>
    request('POST', '/auth/login', { email, senha }),

  register: (nomeCompleto, email, senha) =>
    request('POST', '/auth/register', { nomeCompleto, email, senha }),

  // Projects
  getProjects: () =>
    request('GET', '/projects'),

  // Quotes
  createQuote: (data, token = null) =>
    request('POST', '/quotes', data, token),

  getMyQuotes: (token) =>
    request('GET', '/quotes/my', null, token),

  // Team
  getTeam: () =>
    request('GET', '/team'),
};

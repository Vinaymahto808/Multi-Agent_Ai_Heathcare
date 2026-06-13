const BASE = '/api';

async function request(url, body) {
  const res = await fetch(`${BASE}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const summarize = (text) => request('/summarize', { text });
export const writeArticle = (topic, outline) => request('/write-article', { topic, outline });
export const sanitizeData = (data) => request('/sanitize', { data });

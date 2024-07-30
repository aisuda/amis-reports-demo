import axios from 'axios';
import qs from 'qs';

let csrfToken = '';
export function fetcher({url, method, data, config, headers}: any) {
  config = config || {};
  config.headers = config.headers || headers || {};
  config.withCredentials = true;

  if (csrfToken) {
    // config.headers['X-Csrf-Token'] = csrfToken;
    config.headers['Csrf-Token'] = csrfToken;
  }

  if (method !== 'post' && method !== 'put' && method !== 'patch') {
    if (data) {
      config.params = data;
    }
    return (axios as any)[method](url, config);
  }
  if (data && data instanceof FormData) {
    // config.headers = config.headers || {};
    // config.headers['Content-Type'] = 'multipart/form-data';
  } else if (data && typeof data !== 'string' && !(data instanceof Blob) && !(data instanceof ArrayBuffer)) {
    data = JSON.stringify(data);
    config.headers['Content-Type'] = 'application/json';
  }

  return (axios as any)[method](url, data, config);
}

export function updateCsrfToken(token: string) {
  csrfToken = token;
}

export function fetcherCsrfToken() {
  fetcher({
    url: '/csrfToken',
    method: 'get'
  }).then((response: any) => {
    if (response.data?.data) {
      updateCsrfToken(response.data?.data);
    }
  });
}

export async function fetcherCsrfTokenAsync() {
  const response = await fetcher({
    url: '/csrfToken',
    method: 'get'
  });
  if (response.data?.data) {
    updateCsrfToken(response.data?.data);
  }
}

export function getCsrfToken() {
  return csrfToken;
}

export function getPageQuery() {
  return qs.parse(location.search.substring(1));
}

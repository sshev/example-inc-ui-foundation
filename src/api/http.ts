export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// fetch wrapper tailored for integration with react-query
export const http = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const fetchOptions: RequestInit = {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    ...options,
  };
  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return response.json();
};

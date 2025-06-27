

// const request = <T>(url: string, init: RequestInit): Promise<T> => {
//   return fetch(API_URL + url, init).then(res => {
//     if (!res.ok) {
//       throw new Error(`Status: ${res.status}`);
//     }
//     return res.json();
//   });
// };
// export const httpClient = {
//   get: <T>(endpoint: string) =>
//     request<T>(endpoint, {
//       method: 'GET',
//     }),
//   post: <T>(
//     endpoint: string,
//     body: unknown,
//     init?: Omit<RequestInit, 'body' | 'method'>,
//   ) =>
//     request<T>(endpoint, {
//       ...init,
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         ...init?.headers,
//       },
//       body: JSON.stringify(body),
//     }),
//   patch: <T>(
//     endpoint: string,
//     body: unknown,
//     init?: Omit<RequestInit, 'body' | 'method'>,
//   ) =>
//     request<T>(endpoint, {
//       ...init,
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         ...init?.headers,
//       },
//       body: JSON.stringify(body),
//     }),
//   delete: (endpoint: string) =>
//     request<number>(endpoint, {
//       method: 'DELETE',
//     }),
// };
import { AxiosResponse } from 'axios'

import { instance } from './instance'

const responseBody = <T>(response: AxiosResponse<T>) => response.data

export const request = {
  get: <T>(url: string) =>
    instance.get<T>(url, { withCredentials: true }).then(responseBody),

  post: <T>(url: string, body?: unknown) =>
    instance.post<T>(url, body, { withCredentials: true }).then(responseBody),

  put: <T>(url: string, body?: unknown) =>
    instance.put<T>(url, body).then(responseBody),

  patch: <T>(url: string, body?: unknown) =>
    instance.patch<T>(url, body).then(responseBody),

  delete: <T>(url: string) => instance.delete<T>(url).then(responseBody),
}

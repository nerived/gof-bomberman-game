import axios, { AxiosError } from 'axios'

const BASE_URL = 'https://ya-praktikum.tech/api/v2/'

const API_CALL_TIMEOUT = 30000

const instance = axios.create()

const { defaults } = instance

defaults.baseURL = BASE_URL
defaults.timeout = API_CALL_TIMEOUT
defaults.withCredentials = true

instance.interceptors.request.use(
  config => config,
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  res => res,
  (error: AxiosError) => {
    const { data, status } = error.response!
    switch (status) {
      case 400:
        console.error(data)
        break

      case 401:
        console.error('unauthorised')
        break

      case 404:
        console.error('/not-found')
        break

      case 500:
        console.error('/server-error')
        break
    }
    return Promise.reject(error)
  }
)

export { instance }

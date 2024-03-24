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
    const { status } = error.response!
    switch (status) {
      case 400:
        break

      case 401:
        break

      case 404:
        break

      case 500:
        break
    }
    return Promise.reject(error)
  }
)

export { instance }

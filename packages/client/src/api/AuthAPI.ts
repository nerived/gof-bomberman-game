import { request } from './rest/request'

export interface CommonError {
  reason: string
}

export interface SigninData {
  login: string
  password: string
}

export interface SignupData {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface SignupResp {
  id: number
}

export type User = {
  id: number | null
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  password: string
  phone: string
  avatar: string
  isAuthenticated: boolean
  isLoading: boolean
}

const GATE = '/auth'

export class AuthAPI {
  signin(data: SigninData) {
    return request.post<Promise<'OK'>>(`${GATE}/signin`, data)
  }

  signup(data: SignupData) {
    return request.post<Promise<SignupResp>>(`${GATE}/signup`, data)
  }

  read() {
    return request.get<User>(`${GATE}/user`)
  }

  logout() {
    return request.post<'OK'>(`${GATE}/logout`)
  }
}

export default new AuthAPI()

import { request } from './rest/request'

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

export interface User {
  id: number
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
  avatar: string
}

export interface UserError {
  reason: string
}

const GATE = '/auth'

export class AuthAPI {
  signin(data: SigninData) {
    return request.post(`${GATE}/signin`, data)
  }

  signup(data: SignupData) {
    return request.post(`${GATE}/signup`, data)
  }

  read() {
    return request.get<User | UserError>(`${GATE}/user`)
  }

  logout() {
    return request.post(`${GATE}/logout`)
  }
}

export default new AuthAPI()

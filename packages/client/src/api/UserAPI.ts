import { request } from './rest/request'
import { User } from './AuthAPI'

export interface CommonError {
  reason: string
}

export interface UserData {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface UserChangePassword {
  oldPassword: string
  newPassword: string
}

export interface SearchUser {
  login: string
}

const GATE = '/user'

export class UserAPI {
  changeUser(data: UserData): Promise<User> {
    return request.put<User>(`${GATE}/profile`, data)
  }

  changeAvatar(data: FormData): Promise<User> {
    return request.put<User>(`${GATE}/profile/avatar`, data)
  }

  changePassword(data: UserChangePassword) {
    return request.put<'OK'>(`${GATE}/password`, data)
  }

  getUserById(id: number) {
    return request.get(`${GATE}/${id}`)
  }

  searchUser(data: SearchUser) {
    return request.post(`${GATE}/search`, data)
  }
}

export default new UserAPI()

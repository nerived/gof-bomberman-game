import { request } from './rest/request'

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
  changeUser(data: UserData) {
    return request.put(`${GATE}/profile`, data)
  }

  changeAvatar(data: FormData) {
    return request.put(`${GATE}/avatar`, data)
  }

  changePassword(data: UserChangePassword) {
    return request.put(`${GATE}/password`, data)
  }

  getUserById(id: number) {
    return request.get(`${GATE}/${id}`)
  }

  searchUser(data: SearchUser) {
    return request.post(`${GATE}/search`, data)
  }
}

export default new UserAPI()

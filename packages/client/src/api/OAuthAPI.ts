import { request } from './rest/request'

export interface CommonError {
  reason: string
}

export interface OAuthIdResp {
  service_id: string
}

export interface OAuthSigninData {
  code: string
  redirect_uri: string
}

const GATE = '/oauth/yandex'

export class OAuthAPI {
  getServiceId(redirectURI: string) {
    const searchParams = new URLSearchParams(`redirect_uri=${redirectURI}`)

    return request.get<Promise<OAuthIdResp>>(
      `${GATE}/service-id?${searchParams.toString()}`
    )
  }

  oauthSignin(data: OAuthSigninData) {
    return request.post<'OK'>(`${GATE}`, data)
  }
}

export default new OAuthAPI()

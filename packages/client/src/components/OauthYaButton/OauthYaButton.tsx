import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconButton, Loader } from '../../ui-kit'
import { useAppDispatch } from '../../store'
import { toOAuthPage, userThunks } from '../../features/user'
import { RoutesPaths } from '../../routes/constants'

const yaIcon = `\
url("data:image/svg+xml,%3Csvg width='44' height='44' \
viewBox='0 0 44 44' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect \
width='44' height='44' fill='%23FC3F1D'/%3E%3Cpath d='M24.7407 \
33.9778H29.0889V9.04443H22.7592C16.3929 9.04443 13.0538 12.303 \
13.0538 17.1176C13.0538 21.2731 15.2187 23.6163 19.0532 26.1609L21.3832 \
27.6987L18.3927 25.1907L12.4667 33.9778H17.1818L23.5115 24.5317L21.3098 \
23.0671C18.6496 21.2731 17.3469 19.8818 17.3469 16.8613C17.3469 14.2068 \
19.2183 12.4128 22.7776 12.4128H24.7223V33.9778H24.7407Z' \
fill='white'/%3E%3C/svg%3E%0A")\
`

export function OauthYaButton() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let canceled = false

    const { search, href, origin, pathname } = globalThis.location

    if (!search) return

    const url = new URL(href)
    const code = url.searchParams.get('code')

    if (!code) return

    dispatch(
      userThunks.userOauthLogin({ code, redirect_uri: origin + pathname })
    ).then(data => {
      if (!data.payload?.isSuccess || canceled) return
      return dispatch(userThunks.fetchUser())
    })

    return () => {
      canceled = true
    }
  })

  const handleOAuthLogin = async () => {
    const { origin, pathname } = globalThis.location
    const redirectURI = origin + pathname

    try {
      setIsLoading(true)

      const { payload } = await dispatch(userThunks.fetchOauthId(redirectURI))

      if (!payload) return

      if (!payload.isSuccess) throw Error

      toOAuthPage(payload.serviceId, redirectURI)
    } catch (err) {
      navigate(RoutesPaths.ServerError)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <IconButton onClick={handleOAuthLogin} iconImage={yaIcon} />
      {isLoading && <Loader />}
    </>
  )
}

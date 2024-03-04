import { FC, useEffect } from 'react'
import { useAuth } from '../features/user/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { RoutesPaths } from '../routes/constants'

export const RegistrationPage: FC = () => {
  const { isUserAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isUserAuthenticated) {
      navigate(RoutesPaths.Main)
    }
  }, [isUserAuthenticated, navigate])

  return <div>RegistrationPage</div>
}

import { Navigate, useLocation } from 'react-router-dom'
import { RoutesPaths } from '../../routes/constants'
import { useAuth } from '../../features/user/hooks/useAuth'

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isUserAuthenticated, isUserLoading } = useAuth()

  const location = useLocation()

  if (isUserLoading) {
    return <div>Loading...</div>
  }

  if (!isUserAuthenticated) {
    return (
      <Navigate to={RoutesPaths.Login} state={{ from: location }} replace />
    )
  }

  return children
}

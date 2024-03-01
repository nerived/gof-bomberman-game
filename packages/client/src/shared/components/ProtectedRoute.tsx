import { Navigate, useLocation } from 'react-router-dom'
import { userSelectors } from '../../features/user'
import { useSelector } from 'react-redux'
import { RoutesPaths } from '../../routes/constants'

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector(userSelectors.getUser)

  const location = useLocation()

  if (!user.id) {
    return (
      <Navigate to={RoutesPaths.Login} state={{ from: location }} replace />
    )
  }

  return children
}

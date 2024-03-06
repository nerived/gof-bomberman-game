import { useSelector } from 'react-redux'
import { userSelectors } from '../../../features/user'

export const useAuth = () => {
  const user = useSelector(userSelectors.getUser)

  const isUserAuthenticated = user.isAuthenticated
  const isUserLoading = user.isLoading

  return { isUserAuthenticated, isUserLoading }
}

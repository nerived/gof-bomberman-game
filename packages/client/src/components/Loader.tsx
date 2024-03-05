import { useAuth } from '../features/user/hooks/useAuth'
import { Loader as GlobalLoader } from '../ui-kit'

export const Loader = ({ children }: { children: JSX.Element }) => {
  const { isUserLoading } = useAuth()

  if (isUserLoading) {
    return <GlobalLoader />
  }

  return children
}

import { useAuth } from '../features/user/hooks/useAuth'

export const Loader = ({ children }: { children: JSX.Element }) => {
  const { isUserLoading } = useAuth()

  if (isUserLoading) {
    return <div>Loading...</div>
  }

  return children
}

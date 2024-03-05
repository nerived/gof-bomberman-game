import { useEffect } from 'react'
import { useAppDispatch } from './store'
import { userThunks } from './features/user'

export const AppInitializer = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(userThunks.fetchUser())
  }, [dispatch])

  return null
}

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userThunks } from './features/user'

export const AppInitializer = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userThunks.fetchUser())
  }, [dispatch])

  return null
}

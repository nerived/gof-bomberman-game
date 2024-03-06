import { FC } from 'react'
import { useRoutes } from 'react-router-dom'
import { RoutesPaths } from './constants'
import { ProtectedRoute } from '../shared/components/ProtectedRoute'
import {
  ServerErrorPage,
  ForumMainPage,
  ForumTopicPage,
  GamePage,
  GameOverPage,
  LidersPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  Profile,
  ProfileEdit,
  ProfilePassword,
  RegistrationPage,
  EditAvatar,
} from '../pages'

export const PagesRoutes: FC = () => {
  const pages = useRoutes([
    {
      path: RoutesPaths.Main,
      element: (
        <ProtectedRoute>
          <MainPage />
        </ProtectedRoute>
      ),
    },
    {
      path: RoutesPaths.Login,
      element: <LoginPage />,
    },
    {
      path: RoutesPaths.Registration,
      element: <RegistrationPage />,
    },
    {
      path: RoutesPaths.Profile,
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: RoutesPaths.EditProfile,
      element: (
        <ProtectedRoute>
          <ProfileEdit />
        </ProtectedRoute>
      ),
    },
    {
      path: RoutesPaths.EditPassword,
      element: (
        <ProtectedRoute>
          <ProfilePassword />
        </ProtectedRoute>
      ),
    },
    {
      path: RoutesPaths.EditAvatar,
      element: (
        <ProtectedRoute>
          <EditAvatar />
        </ProtectedRoute>
      ),
    },
    {
      path: RoutesPaths.Game,
      element: (
        <ProtectedRoute>
          <GamePage />
        </ProtectedRoute>
      ),
    },
    {
      path: RoutesPaths.GameOver,
      element: (
        <ProtectedRoute>
          <GameOverPage />
        </ProtectedRoute>
      ),
    },
    {
      path: RoutesPaths.Liders,
      element: (
        <ProtectedRoute>
          <LidersPage />
        </ProtectedRoute>
      ),
    },
    {
      path: RoutesPaths.Forum,
      element: (
        // <ProtectedRoute>
        <ForumMainPage />
        // </ProtectedRoute>
      ),
    },
    {
      path: `${RoutesPaths.Forum}/:id`,
      element: (
        <ProtectedRoute>
          <ForumTopicPage />
        </ProtectedRoute>
      ),
    },
    {
      path: RoutesPaths.ServerError,
      element: (
        <ProtectedRoute>
          <ServerErrorPage />
        </ProtectedRoute>
      ),
    },
    {
      path: RoutesPaths.NotFound,
      element: (
        <ProtectedRoute>
          <NotFoundPage />
        </ProtectedRoute>
      ),
    },
  ])

  return <>{pages}</>
}

import { FC } from 'react'
import { useRoutes, Outlet } from 'react-router-dom'
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

const ProtectedLayout = () => (
  <ProtectedRoute>
    <Outlet />
  </ProtectedRoute>
)

export const PagesRoutes: FC = () => {
  const pages = useRoutes([
    {
      path: RoutesPaths.Main,
      element: <ProtectedLayout />,
      children: [
        { index: true, element: <MainPage /> },
        { path: RoutesPaths.Profile, element: <Profile /> },
        { path: RoutesPaths.EditProfile, element: <ProfileEdit /> },
        { path: RoutesPaths.EditPassword, element: <ProfilePassword /> },
        { path: RoutesPaths.EditAvatar, element: <EditAvatar /> },
        { path: RoutesPaths.Game, element: <GamePage /> },
        { path: RoutesPaths.GameOver, element: <GameOverPage /> },
        { path: RoutesPaths.Liders, element: <LidersPage /> },
        { path: RoutesPaths.Forum, element: <ForumMainPage /> },
        { path: `${RoutesPaths.Forum}/:id`, element: <ForumTopicPage /> },
        { path: RoutesPaths.ServerError, element: <ServerErrorPage /> },
        { path: RoutesPaths.NotFound, element: <NotFoundPage /> },
      ],
    },
    {
      path: RoutesPaths.Login,
      element: <LoginPage />,
    },
    {
      path: RoutesPaths.Registration,
      element: <RegistrationPage />,
    },
  ])

  return <>{pages}</>
}

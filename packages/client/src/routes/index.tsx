import { FC } from 'react'
import { useRoutes } from 'react-router-dom'
import { RoutesPaths } from './constants'
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
} from '../pages'

export const PagesRoutes: FC = () => {
  const pages = useRoutes([
    { path: RoutesPaths.Main, element: <MainPage /> },
    { path: RoutesPaths.Login, element: <LoginPage /> },
    { path: RoutesPaths.Registration, element: <RegistrationPage /> },
    { path: RoutesPaths.Profile, element: <Profile /> },
    { path: RoutesPaths.EditProfile, element: <ProfileEdit /> },
    { path: RoutesPaths.EditPassword, element: <ProfilePassword /> },
    { path: RoutesPaths.Game, element: <GamePage /> },
    { path: RoutesPaths.GameOver, element: <GameOverPage /> },
    { path: RoutesPaths.Liders, element: <LidersPage /> },
    { path: RoutesPaths.Forum, element: <ForumMainPage /> },
    { path: `${RoutesPaths.Forum}/:id`, element: <ForumTopicPage /> },
    { path: RoutesPaths.ServerError, element: <ServerErrorPage /> },
    { path: RoutesPaths.NotFound, element: <NotFoundPage /> },
  ])

  return <>{pages}</>
}

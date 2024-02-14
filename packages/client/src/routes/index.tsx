import { FC } from 'react'
import { useRoutes } from 'react-router-dom'
import { RoutesPaths } from './constants'
import {
  ErrorPage,
  ForumMainPage,
  ForumTopicPage,
  GamePage,
  LidersPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  RegistrationPage,
} from '../pages'

export const PagesRoutes: FC = () => {
  const pages = useRoutes([
    { path: RoutesPaths.Main, element: <MainPage /> },
    { path: RoutesPaths.Login, element: <LoginPage /> },
    { path: RoutesPaths.Registration, element: <RegistrationPage /> },
    { path: RoutesPaths.Profile, element: <ProfilePage /> },
    { path: RoutesPaths.Game, element: <GamePage /> },
    { path: RoutesPaths.Liders, element: <LidersPage /> },
    { path: RoutesPaths.Forum, element: <ForumMainPage /> },
    { path: `${RoutesPaths.Forum}/:id`, element: <ForumTopicPage /> },
    { path: RoutesPaths.Error, element: <ErrorPage /> },
    { path: RoutesPaths.NotFound, element: <NotFoundPage /> },
  ])

  return <>{pages}</>
}

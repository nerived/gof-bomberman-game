export enum RoutesPaths {
  Main = '/',
  Login = '/login',
  Registration = '/registration',
  Profile = '/profile',
  EditProfile = '/edit-profile',
  EditAvatar = '/edit-avatar',
  EditPassword = '/edit-password',
  Liders = '/liders',
  Game = '/game',
  GameOver = '/game-over',
  Forum = '/forum',
  ServerError = '/server-error',
  NotFound = '*',
}

export enum AuthorizedRoutesNav {
  Main = RoutesPaths.Main,
  Profile = RoutesPaths.Profile,
  Liders = RoutesPaths.Liders,
  Game = RoutesPaths.Game,
  Forum = RoutesPaths.Forum,
}

export enum NotAuthorizedRoutesNav {
  Main = RoutesPaths.Main,
  Login = RoutesPaths.Login,
  Registration = RoutesPaths.Registration,
  Liders = RoutesPaths.Liders,
  Game = RoutesPaths.Game,
  Forum = RoutesPaths.Forum,
}

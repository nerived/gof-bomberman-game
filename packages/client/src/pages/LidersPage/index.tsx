import { FC } from 'react'
import { LayoutCentered } from '../../ui-kit'
import {
  AvatarWrapperStyled,
  LidersPageStyled,
  PlayerInfoStyled,
  PlayerRowStyled,
} from './LidersPage.styled'

const players: Array<{ name: string; src: string; score: number }> = [
  {
    name: 'Mad man',
    src: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/19/1956bddf2f4c9db6fa1e3f813f305a4fc6730b50_full.jpg',
    score: 10000,
  },
  {
    name: 'Joker',
    src: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/19/1971cb9e23175a3d8561b1c7760f22ff3c82375b_full.jpg',
    score: 9000,
  },
  {
    name: 'Saw',
    src: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/19/198c795ab43815d3462447e4d86c20021f5ab135_full.jpg',
    score: 8000,
  },
  {
    name: 'Rocket',
    src: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/19/19929db654cac5fa2f8a35bb8f5663fe139c2ac7_full.jpg',
    score: 7000,
  },
  {
    name: 'Woody',
    src: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/19/19af4ad19661a28f5ba9422333e466d01d745524_full.jpg',
    score: 6000,
  },
  {
    name: 'Tiesto',
    src: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/19/19af2629bde0c2ca82251bc3bf8ca7f1b3fdbd67_full.jpg',
    score: 5000,
  },
  {
    name: 'Zayac',
    src: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/19/19b60b26e945aeb73300b61cf3cba3be32337f55_full.jpg',
    score: 4000,
  },
  {
    name: 'Troll',
    src: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/19/198f53bdfa228d7c0f85628f32d0653d691c5742_full.jpg',
    score: 3000,
  },
  {
    name: 'Jim Carey',
    src: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/19/196f03267b4ee406e94eb18b6bebbd23435f431a_full.jpg',
    score: 2000,
  },
  {
    name: 'Тетя Мотя',
    src: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/19/195b631677a2a616672fb517035b919b2d2437fc_full.jpg',
    score: 1000,
  },
]

export const LidersPage: FC = () => {
  return (
    <LayoutCentered>
      <LidersPageStyled>Таблица лидеров</LidersPageStyled>
      {players.map(({ name, src, score }, index) => (
        <PlayerRowStyled key={name}>
          <PlayerInfoStyled>
            <div>{index + 1}.</div>
            <AvatarWrapperStyled>
              <img src={src} alt="avatar" />
            </AvatarWrapperStyled>
            <div>{name}</div>
          </PlayerInfoStyled>
          <div>{score}</div>
        </PlayerRowStyled>
      ))}
    </LayoutCentered>
  )
}

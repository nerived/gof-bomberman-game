import { FC, useEffect, useState } from 'react'

import { Layout } from '../../ui-kit'

import {
  AvatarWrapperStyled,
  PlayerInfoStyled,
  PlayerRowStyled,
  PlayerList,
} from './LidersPage.styled'
import LeaderBoardAPI from '../../api/LiderBoardAPI'
import { userSelectors } from '../../features/user'
import { useSelector } from 'react-redux'

export const LidersPage: FC = () => {
  const user = useSelector(userSelectors.getUser)
  const [players, setPlayers] = useState<
    Array<{ name: string; src: string; score: number }>
  >([])

  useEffect(() => {
    if (user.isAuthenticated) {
      ;(async () => {
        const response = await LeaderBoardAPI.getLeaderBoard()

        if (response) {
          setPlayers(
            response.map(({ data }) => {
              return {
                name: data.user.email || '',
                src: data.user.avatar || '',
                score: data.gofResult || 0,
              }
            })
          )
        }
      })()
    }
  }, [])

  return (
    <Layout title="Таблица лидеров">
      <PlayerList>
        {players.map(({ name, src, score }, index) => (
          <PlayerRowStyled key={name}>
            <PlayerInfoStyled>
              <div>{index + 1}.</div>
              <AvatarWrapperStyled>
                <img src={src} />
              </AvatarWrapperStyled>
              <div>{name}</div>
            </PlayerInfoStyled>
            <div>{score}</div>
          </PlayerRowStyled>
        ))}
      </PlayerList>
    </Layout>
  )
}

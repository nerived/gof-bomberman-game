import { FC } from 'react'

import { LinkButton, LinkButtonMode, Layout } from '../../ui-kit'
import { Logo } from '../../ui-kit/Logo/Logo.styled'
import { RoutesPaths } from '../../routes/constants'

import * as S from './MainPage.styled'

export const MainPage: FC = () => {
  return (
    <Layout title={'Добро пожаловать в игру Bomberman!'}>
      <S.LogoWrapper>
        <Logo src="/logo.png" alt="bomberman logo" />
      </S.LogoWrapper>

      <S.MarginWrapper>
        <LinkButton
          content="START"
          to={RoutesPaths.Game}
          mode={LinkButtonMode.BIT}
        />
      </S.MarginWrapper>
      <S.DecsrWrapper>
        <S.H3>Инструкция</S.H3>
        <S.P>Управленние стрелками с клавиатуры</S.P>
        <S.P>Установка бомбы "B"</S.P>
        <S.P>Переход в фулскринн режим "F"</S.P>

        <S.H3>Описание</S.H3>
        <S.P>
          Bomberman – это классическая ретро-аркада, ставшая легендой в мире
          видеоигр. Здесь вы сможете окунуться в атмосферу захватывающего
          приключения, полного адреналина и взрывного веселья!
        </S.P>
        <S.P>
          Ваша задача – пройти все уровни, избегая ловушек и уничтожая врагов с
          помощью бомб. Проявите свою стратегию и скорость реакции, чтобы стать
          победителем в этой увлекательной игре!
        </S.P>
        <S.P>
          Классический геймплей: Бомбермен предлагает знакомый и увлекательный
          игровой процесс, где вы будете размещать бомбы на уровнях, чтобы
          уничтожить врагов и преграды.
        </S.P>
      </S.DecsrWrapper>
    </Layout>
  )
}

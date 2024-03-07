import { FC } from 'react'

import * as S from './Instruction.styled'
import { Button, Arrow } from './components'

import purpleOctopusImage from '../Game/bomberman/assets/purple-octopus-single.png'
import blueOctopusImage from '../Game/bomberman/assets/blue-octopus-single.png'
import addBombImage from '../Game/bomberman/assets/thing-ammo.png'
import addLifeImage from '../Game/bomberman/assets/thing-life.png'
import playerImage from '../Game/bomberman/assets/player-single.png'
import powerImage from '../Game/bomberman/assets/thing-power.png'
import doorImage from '../Game/bomberman/assets/thing-door.png'
import bombImage from '../Game/bomberman/assets/bomb-single.png'
import brickImage from '../Game/bomberman/assets/brick.png'

export const Instruction: FC = () => {
  return (
    <S.Content>
      <S.H3>Инструкция</S.H3>
      <S.P>Управленние Bomberman с клавиатуры:</S.P>
      <S.List>
        <S.ListItem>
          <Button isImg>{<img src={playerImage} alt="" />}</Button>
          <S.Descr>игрок</S.Descr>
        </S.ListItem>
        <S.ListItem>
          <Button>
            <Arrow />
          </Button>
          <S.Descr>движение влево</S.Descr>
        </S.ListItem>
        <S.ListItem>
          <Button rotate={90}>
            <Arrow />
          </Button>
          <S.Descr>движение вверх</S.Descr>
        </S.ListItem>
        <S.ListItem>
          <Button rotate={180}>
            <Arrow />
          </Button>
          <S.Descr>движение вправо</S.Descr>
        </S.ListItem>
        <S.ListItem>
          <Button rotate={270}>
            <Arrow />
          </Button>
          <S.Descr>движение вниз</S.Descr>
        </S.ListItem>
        <S.ListItem>
          <Button>B</Button>
          <S.Descr>установка бомбы</S.Descr>
        </S.ListItem>
        <S.ListItem>
          <Button>F</Button>
          <S.Descr>переход в фулскринн режим</S.Descr>
        </S.ListItem>
        <S.ListItem>
          <Button isImg>
            <img src={brickImage} alt="" />
          </Button>
          <S.Descr>разрушаемый блок</S.Descr>
        </S.ListItem>
        <S.ListItem>
          <Button isImg>
            <img src={purpleOctopusImage} alt="" />
          </Button>
          <Button isImg>
            <img src={blueOctopusImage} alt="" />
          </Button>
          <S.Descr>враги</S.Descr>
        </S.ListItem>

        <S.ListItem>
          <Button isImg>
            <img src={bombImage} alt="" />
          </Button>
          <S.Descr>бомба</S.Descr>
        </S.ListItem>
        <S.ListItem>
          <Button isImg>
            <img src={addBombImage} alt="" />
          </Button>
          <S.Descr>+1 дополнительная бомба</S.Descr>
        </S.ListItem>
        <S.ListItem>
          <Button isImg>
            <img src={addLifeImage} alt="" />
          </Button>
          <S.Descr>+1 дополнительная жизнь</S.Descr>
        </S.ListItem>
        <S.ListItem>
          <Button isImg>
            <img src={powerImage} alt="" />
          </Button>
          <S.Descr>увеличение радиуса взрыва</S.Descr>
        </S.ListItem>
        <S.ListItem>
          <Button isImg>
            <img src={doorImage} alt="" />
          </Button>
          <S.Descr>портал окончания уровня</S.Descr>
        </S.ListItem>
      </S.List>
    </S.Content>
  )
}

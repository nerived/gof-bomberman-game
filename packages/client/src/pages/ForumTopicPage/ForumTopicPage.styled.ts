import { styled } from 'styled-components'
import { ForumTitle, Topic } from '../ForumMainPage/ForumMainPage.styled'
import { Colors } from '../../tokens'

export const MessagesWrapper = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  overflow: auto;
  padding-bottom: 32px;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 16px;
`

export const TopicMainTitle = styled(ForumTitle)`
  padding-block: 32px;
`
export const CustomTopic = styled(Topic)`
  cursor: default;

  &:hover {
    background-color: ${Colors.ELEVATION};
  }
`

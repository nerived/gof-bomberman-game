import { styled } from 'styled-components'
import { Colors } from '../../tokens'

export const ForumPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
`
export const ForumTitle = styled.h1`
  color: ${Colors.WHITE};
`
export const TopicsWrapper = styled.div`
  width: 100%;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Topic = styled.div`
  width: 100%;
  background-color: #283e4b;
  min-height: 100px;
  border-radius: 16px;
  box-shadow: -3px 14px 29px -9px rgba(0, 0, 0, 0.88);
  cursor: pointer;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &:hover {
    background-color: #213542;
  }
`

export const TopicTitle = styled.h2`
  color: ${Colors.YELLOW};
`
export const TopicDescription = styled.p`
  color: ${Colors.YELLOW};
  font-size: 14px;
`

export const TopicMessagesCount = styled.span`
  color: ${Colors.WHITE};
  line-height: 48px;
  padding-inline: 8px;
`

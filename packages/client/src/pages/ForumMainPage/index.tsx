import { FC } from 'react'
import {
  ForumPageWrapper,
  ForumTitle,
  Topic,
  TopicDescription,
  TopicMessagesCount,
  TopicTitle,
  TopicsWrapper,
} from './ForumMainPage.styled'
import { topics, topicsMessages } from './mock'

export const ForumMainPage: FC = () => {
  return (
    <ForumPageWrapper>
      <ForumTitle>Форумы</ForumTitle>
      <TopicsWrapper>
        {topics.map(({ id, title, description }) => (
          <Topic key={id}>
            <TopicTitle>{title}</TopicTitle>
            <TopicDescription>{description}</TopicDescription>

            <TopicMessagesCount>
              Сообщений: {topicsMessages[id].length}
            </TopicMessagesCount>
          </Topic>
        ))}
      </TopicsWrapper>
    </ForumPageWrapper>
  )
}

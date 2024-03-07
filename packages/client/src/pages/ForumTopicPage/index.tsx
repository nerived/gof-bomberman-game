import { ChangeEvent, FC, useState } from 'react'
import {
  ForumPageWrapper,
  Topic,
  TopicDescription,
  TopicTitle,
} from '../ForumMainPage/ForumMainPage.styled'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addTopicMessage, forumSelectors } from '../../features/forum'
import {
  ButtonsWrapper,
  CustomTopic,
  MessagesWrapper,
  TopicMainTitle,
} from './ForumTopicPage.styled'
import { Button, ButtonMode, CustomField } from '../../ui-kit'
import { userSelectors } from '../../features/user'
import { RoutesPaths } from '../../routes/constants'

export const ForumTopicPage: FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const topic = useSelector(forumSelectors.getTopic(id || '0'))
  const user = useSelector(userSelectors.getUser)
  const currentMessages = useSelector(forumSelectors.getCurrentMessages)
  const [text, setText] = useState('')

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  const addMessage = () => {
    if (id) {
      if (id in currentMessages) {
        dispatch(
          addTopicMessage({
            ...currentMessages,
            [id]: [
              ...currentMessages[id],
              {
                id: Date.now(),
                author: `${user.first_name} ${user.second_name}`,
                text,
              },
            ],
          })
        )
      } else {
        dispatch(
          addTopicMessage({
            ...currentMessages,
            [id]: [
              {
                id: Date.now(),
                author: `${user.first_name} ${user.second_name}`,
                text,
              },
            ],
          })
        )
      }
      setText('')
    }
  }

  const handleRedirectToForum = () => {
    navigate(RoutesPaths.Forum)
  }

  return (
    <ForumPageWrapper>
      <TopicMainTitle>Топик:</TopicMainTitle>
      <CustomTopic>
        <TopicTitle>{topic?.title}</TopicTitle>
        <TopicDescription>{topic?.description}</TopicDescription>
      </CustomTopic>
      <TopicMainTitle>Сообщения:</TopicMainTitle>
      <MessagesWrapper>
        {(currentMessages[id || '0'] || []).map(message => (
          <CustomTopic key={message.id}>
            <TopicTitle>{message.author}</TopicTitle>
            <TopicDescription>{message.text}</TopicDescription>
          </CustomTopic>
        ))}
      </MessagesWrapper>
      <CustomField
        labelText="Сообщение"
        name="message"
        id="message"
        value={text}
        onChange={handleOnChange}
        form={{}}
        asTextArea
      />
      <ButtonsWrapper>
        <Button
          content="Создать"
          type="button"
          mode={ButtonMode.MAIN}
          onClick={addMessage}
          disabled={!text}
        />
        <Button
          content="Назад"
          type="button"
          mode={ButtonMode.OUTLINE}
          onClick={handleRedirectToForum}
        />
      </ButtonsWrapper>
    </ForumPageWrapper>
  )
}

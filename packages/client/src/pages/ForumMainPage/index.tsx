import { FC, useState } from 'react'
import {
  ForumPageWrapper,
  ForumTitle,
  ModalContentWrapper,
  Topic,
  TopicDescription,
  TopicMessagesCount,
  TopicTitle,
  TopicsWrapper,
} from './ForumMainPage.styled'
import { topicsMessages } from './mock'
import { Button, ButtonMode, CustomField } from '../../ui-kit'
import { Modal } from '../../components/Modal'
import { useFormik } from 'formik'
import { validate } from '../../utils'
import { useNavigate } from 'react-router-dom'
import { RoutesPaths } from '../../routes/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addTopic, forumSelectors } from '../../features/forum'

import * as S from '../Login/Login.styled'

const initialValues = { title: '', description: '' }

export const ForumMainPage: FC = () => {
  const dispatch = useDispatch()
  const currentTopics = useSelector(forumSelectors.getTopics)
  const currentMessages = useSelector(forumSelectors.getCurrentMessages)

  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      dispatch(addTopic(values))
      handleCloseModal()
    },
    validate: values => {
      const errors: Partial<typeof initialValues> = {}

      const titleError = validate.validateNotEmpty(values.title)
      const descriptionError = validate.validateMaxLength(values.description)

      if (titleError) {
        errors.title = titleError
      }

      if (descriptionError) {
        errors.description = descriptionError
      }

      return errors
    },
    validateOnBlur: true,
  })

  const handleCloseModal = () => {
    setIsOpen(false)
    resetForm()
  }

  const handleTopicClick = (id: number) => {
    navigate(`${RoutesPaths.Forum}/${id}`)
  }

  const {
    handleSubmit,
    handleChange,
    values,
    isSubmitting,
    isValid,
    resetForm,
    errors,
    touched,
  } = formik

  return (
    <ForumPageWrapper>
      <ForumTitle>Форумы</ForumTitle>
      <TopicsWrapper>
        {currentTopics.map(({ id, title, description }) => (
          <Topic key={id} onClick={() => handleTopicClick(id)}>
            <TopicTitle>{title}</TopicTitle>
            <TopicDescription>{description}</TopicDescription>

            <TopicMessagesCount>
              Сообщений: {currentMessages[id]?.length || 0}
            </TopicMessagesCount>
          </Topic>
        ))}
      </TopicsWrapper>
      <Button
        mode={ButtonMode.MAIN}
        content="Создать топик"
        onClick={() => setIsOpen(true)}
      />
      <Modal
        isOpen={isOpen}
        title="Создать топик"
        handleCloseModal={handleCloseModal}>
        <form onSubmit={handleSubmit}>
          <ModalContentWrapper>
            <CustomField
              labelText="Заголовок топика"
              name="title"
              type="text"
              id="title"
              value={values.title}
              onChange={handleChange}
              form={{ errors, touched, name: 'title' }}
            />

            <CustomField
              labelText="Описание"
              name="description"
              id="description"
              value={values.description}
              onChange={handleChange}
              asTextArea
              form={{ errors, touched, name: 'description' }}
            />

            <S.Actions>
              <S.Action>
                <Button
                  content="Создать"
                  type="submit"
                  mode={ButtonMode.MAIN}
                  disabled={isSubmitting || !isValid}
                />
              </S.Action>
              <S.Action>
                <Button
                  content="Отмена"
                  type="button"
                  mode={ButtonMode.OUTLINE}
                  onClick={handleCloseModal}
                />
              </S.Action>
            </S.Actions>
          </ModalContentWrapper>
        </form>
      </Modal>
    </ForumPageWrapper>
  )
}

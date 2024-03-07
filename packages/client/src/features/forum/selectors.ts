import { RootState } from '../../store'

export const getTopics = (state: RootState) => {
  return state.forum.topics
}

export const getTopic = (id: string) => (state: RootState) => {
  return state.forum.topics.find(topic => String(topic.id) === id)
}

export const getCurrentMessages = (state: RootState) => {
  return state.forum.topicsMessages
}

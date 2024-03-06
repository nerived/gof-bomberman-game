import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { topics, topicsMessages } from '../../pages/ForumMainPage/mock'

const initialState = { topics, topicsMessages }

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    addTopic: (
      state,
      action: PayloadAction<{ title: string; description: string }>
    ) => {
      state.topics.push({ ...action.payload, id: Date.now() })
    },
    addTopicMessage: (state, action: PayloadAction<typeof topicsMessages>) => {
      state.topicsMessages = action.payload
    },
  },
})

export const { addTopic, addTopicMessage } = forumSlice.actions

export const forumReducer = forumSlice.reducer

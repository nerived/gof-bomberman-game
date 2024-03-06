import { FC } from 'react'
import { ErrorPageContent } from '../widgets/ErrorPageContent'
import { ErrorPageText } from '../shared/config'

export const NotFoundPage: FC = () => {
  return <ErrorPageContent errorText={ErrorPageText.NOT_FOUND} />
}

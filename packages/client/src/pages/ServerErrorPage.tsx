import { FC } from 'react'
import { ErrorPageContent } from '../widgets/ErrorPageContent'
import { ErrorPageText } from '../shared/config'

export const ServerErrorPage: FC = () => {
  return <ErrorPageContent errorText={ErrorPageText.SERVER_ERROR} />
}

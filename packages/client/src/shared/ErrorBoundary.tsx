import React from 'react'
import styled from 'styled-components'
import { Colors } from '../tokens'

const ErrorContainer = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
`

const ErrorText = styled.p`
  color: ${Colors.YELLOW};
`

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorText>
            Упс, что то пошло не так. Пожалуйста, перезагрузите страницу.
          </ErrorText>
        </ErrorContainer>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

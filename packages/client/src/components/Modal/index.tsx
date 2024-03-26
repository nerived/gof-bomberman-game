import { FC, useEffect, useRef, MouseEvent, PropsWithChildren } from 'react'
import { CloseBtn, Content, Head, ModalBody, Root } from './Modal.styled'

export interface ModalProps {
  title: string
  handleCloseModal: () => void
  isOpen: boolean
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  title,
  handleCloseModal,
  isOpen,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
  }, [isOpen])

  const handleBlur = (event: MouseEvent) => {
    if (!modalRef.current) return

    if (
      event.target instanceof Element &&
      !modalRef.current.contains(event.target)
    ) {
      handleCloseModal()
    }
  }

  return (
    <Root $isOpen={isOpen} onClick={handleBlur}>
      <ModalBody $isOpen={isOpen} ref={modalRef}>
        <Head>
          {title}
          <CloseBtn onClick={handleCloseModal} />
        </Head>
        <Content>{children}</Content>
      </ModalBody>
    </Root>
  )
}

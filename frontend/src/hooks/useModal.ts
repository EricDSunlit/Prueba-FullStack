import { MouseEventHandler, useState } from "react"

const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleModal = (): void => {
    setIsOpen((previous) => !previous)
  }

  return { isOpen, handleModal }
}

export default useModal

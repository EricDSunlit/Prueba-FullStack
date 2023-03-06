import { ReactNode } from "react"
import "./InsurerFormModal.css"
export interface InsurerFormModalProps {
  children: ReactNode
  isOpen: boolean
}

const InsurerFormModal: React.FC<InsurerFormModalProps> = ({
  children,
  isOpen
}) => {
  return (
    <dialog open={isOpen} className="ifm_container">
      <div className="form_container">{children}</div>
    </dialog>
  )
}

export default InsurerFormModal

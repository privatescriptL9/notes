import React, { MutableRefObject, useContext } from 'react'
import { ContentContext } from '../../ContentContext'
import './Workspace.scss'

interface workspaceProps {
  siderStatus: boolean
  changeHandler: (value: string) => void
  disabled: boolean
  inputRef: MutableRefObject<null>
}

const Workspace: React.FC<workspaceProps> = ({
  siderStatus,
  changeHandler,
  disabled,
  inputRef
}) => {
  const content = useContext(ContentContext)

  return (
    <textarea
      ref={inputRef}
      disabled={disabled}
      onChange={event => changeHandler(event.target.value)}
      value={content}
      style={{ width: siderStatus ? '75%' : '100%' }}
      className="Workspace"
    />
  )
}

export default Workspace

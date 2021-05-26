import React from 'react'
import './Workspace.scss'

interface workspaceProps {
  siderStatus: boolean
  content: string
  changeHandler: (value: string) => void,
  disabled: boolean
}

const Workspace: React.FC<workspaceProps> = ({ siderStatus, content, changeHandler, disabled }) => {

  return (
    <textarea
      disabled={disabled}
      onChange={event => changeHandler(event.target.value)}
      value={content}
      placeholder="Выберите заметку"
      style={{ width: siderStatus ? '75%' : '100%' }}
      className="Workspace"
    />
  )
}

export default Workspace

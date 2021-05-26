import React from 'react'
import './Workspace.scss'

interface workspaceProps {
  siderStatus: boolean
  content: string
}

const Workspace: React.FC<workspaceProps> = ({ siderStatus, content }) => {

  

  return (
    <textarea
      value={content}
      placeholder="Выберите заметку"
      style={{ width: siderStatus ? '75%' : '100%' }}
      className="Workspace"
    />
  )
}

export default Workspace

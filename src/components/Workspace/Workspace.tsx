import React from 'react'
import './Workspace.scss'

interface workspaceProps {
  siderStatus: boolean
}

const Workspace: React.FC<workspaceProps> = ({
  siderStatus
}) => (
  <div contentEditable style={{width: siderStatus ? '75%' : '100%'}} className="Workspace">
  </div>
)

export default Workspace

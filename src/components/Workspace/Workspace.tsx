import React, { MutableRefObject, useContext } from 'react'
import { ContentContext } from '../../ContentContext'
import './Workspace.scss'

interface workspaceProps {
  siderStatus: boolean
  changeHandler: (value: string) => void
  inputRef: MutableRefObject<null>
  addOneNote: () => void
}

const Workspace: React.FC<workspaceProps> = ({
  siderStatus,
  changeHandler,
  inputRef,
  addOneNote
}) => {
  const content = useContext(ContentContext)

  return (
    <textarea
      ref={inputRef}
      onClick={addOneNote}
      onChange={event => changeHandler(event.target.value)}
      value={content}
      style={{ width: siderStatus ? '75%' : '100%' }}
      className="Workspace"
    />
  )
}

export default Workspace

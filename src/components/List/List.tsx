import React, { useContext } from 'react'
import './List.scss'
import { List } from 'antd'
import { AddClass, NotesContext } from '../../NotesContext'

const ListItem: React.FC = () => {
  const notes = useContext(NotesContext)
  const AddClassHandler = useContext(AddClass)


  return (
    <List
      className="List"
      itemLayout="horizontal"
      dataSource={notes}
      renderItem={item => (
        <List.Item
          id={item.id + ''}
          onClick={event => AddClassHandler(event, item.id)}
          className={`ListItem ${item.isActive ? 'active' : ''}`}
        >
          <List.Item.Meta
            title={<span>{item.title}</span>}
            description={item.content}
          />
        </List.Item>
      )}
    />
  )
}

export default ListItem

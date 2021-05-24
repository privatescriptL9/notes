import React, { useContext } from 'react'
import './List.scss'
import { List } from 'antd'
import { NotesContext } from '../../NotesContext'


const ListItem: React.FC = () => {

  const notes = useContext(NotesContext)

  

  return (
    <List
      className="List"
      itemLayout="horizontal"
      dataSource={notes}
      renderItem={item => (
        <List.Item className="ListItem">
          <List.Item.Meta
            title={<h2>{item.title}</h2>}
            description={item.content}
          />
        </List.Item>
      )}
    />
  )
}

export default ListItem

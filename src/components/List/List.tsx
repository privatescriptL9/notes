import React, { useContext } from 'react'
import classes from './List.module.scss'
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
        <List.Item className="List">
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

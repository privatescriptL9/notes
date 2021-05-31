import React, { useContext } from 'react'
import './List.scss'
import { List } from 'antd'
import { AddClass, NotesContext } from '../../NotesContext'

const ListItem: React.FC = () => {
  const notes = useContext(NotesContext).slice(0).reverse()
  const AddClassHandler = useContext(AddClass)

  return (
    <List
      className="List"
      itemLayout="horizontal"
      dataSource={notes}
      renderItem={item => (
        <List.Item
          onClick={event => AddClassHandler(event, item.id)}
          className={`ListItem ${item.isActive ? 'active' : ''}`}
        >
          <List.Item.Meta
            title={
              <span>
                {item.content.substring(0, 11)
                  ? item.content.substring(0, 11)
                  : 'Новая заметка'}
              </span>
            }
            description={`${item.editableTime} ${
              item.content.substring(11, 47)
                ? item.content.substring(11, 47)
                : 'Нет дополнительного текста'
            } ${item.content ? (item.content.length > 46 ? '...' : '') : ''}`}
          />
        </List.Item>
      )}
    />
  )
}

export default ListItem

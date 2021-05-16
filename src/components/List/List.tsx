import React from 'react'
import './List.scss'
import { List } from 'antd'

const ListItem: React.FC = () => {

  const data = [
    {
      title: 'Title 1',
      content: 'Some text 1'
    },
    {
      title: 'Title 2',
      content: 'Some text 2'
    },
    {
      title: 'Title 3',
      content: 'Some text 3'
    },
    {
      title: 'Title 4',
      content: 'Some text 4'
    },
    {
      title: 'Title 5',
      content: 'Some text 5'
    },
    {
      title: 'Title 6',
      content: 'Some text 6'
    },
    {
      title: 'Title 7',
      content: 'Some text 7'
    },
    {
      title: 'Title 8',
      content: 'Some text 8'
    },
    {
      title: 'Title 9',
      content: 'Some text 9'
    },
    {
      title: 'Title 10',
      content: 'Some text 10'
    }
  ]

  return (
    <List
      className="List"
      itemLayout="horizontal"
      dataSource={data}
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

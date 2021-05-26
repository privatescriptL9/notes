import Search from 'antd/lib/input/Search'
import React, { useContext } from 'react'
import { ContentContext } from '../../ContentContext'
import './SearchBox.scss'

const SearchBox: React.FC = () => {

  const content = useContext(ContentContext)

  const onSearch = (value: string) => {
    console.log(content) 
    console.log(value) 
    if (content.includes(value)) {
    alert(`Значение ${value} найдено`)
    }
  }

  return (
    <Search className="SearchBox" placeholder="Поиск" onSearch={onSearch} enterButton />
  )
}

export default SearchBox

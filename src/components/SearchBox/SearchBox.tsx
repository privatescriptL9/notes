import Search from 'antd/lib/input/Search'
import React from 'react'
import './SearchBox.scss'

const SearchBox: React.FC = () => {

  const onSearch = (value: string) => {
    console.log(value)
  }

  return (
    <Search className="SearchBox" placeholder="Поиск" onSearch={onSearch} enterButton />
  )
}

export default SearchBox

import Search from 'antd/lib/input/Search'
import React, { useContext } from 'react'
import { DisableContext, FilterHandlerContext } from '../../SearchBoxContext'
import './SearchBox.scss'

const SearchBox: React.FC = () => {
  const disabled = useContext(DisableContext)
  const filterHandler = useContext(FilterHandlerContext)

  const onSearch = (value: string) => {
    filterHandler(value)
  }

  return (
    <Search disabled={disabled} className="SearchBox" placeholder="Поиск" onSearch={onSearch} enterButton />
  )
}

export default SearchBox

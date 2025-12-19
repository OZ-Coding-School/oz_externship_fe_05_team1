import { useState } from 'react'

export function useSearchTerm(initialValue = '') {
  const [search, setSearch] = useState(initialValue)

  const handleChangeSearch = (value: string) => {
    setSearch(value)
  }

  const resetSearch = () => {
    setSearch('')
  }

  return {
    search,
    setSearch: handleChangeSearch,
    resetSearch,
  }
}

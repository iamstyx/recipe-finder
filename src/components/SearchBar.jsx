import { useState } from 'react'

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const searchTerm = e.target.search.value
    onSearch(searchTerm)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="search"
        name="search"
        placeholder="Search for recipes..."
        className="w-full px-4 py-3 bg-white border border-surface-200 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                 placeholder-surface-400 text-gray-900"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary-600
                 hover:bg-primary-500 rounded-md transition-colors duration-200
                 text-white font-medium"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar 
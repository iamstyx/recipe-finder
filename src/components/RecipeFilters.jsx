import { useState } from 'react';

const RecipeFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    cuisine: '',
    dietaryRestrictions: [],
    cookingTime: 'all'
  });

  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free'
  ];

  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white border border-surface-200 rounded-lg">
      <select 
        className="px-3 py-2 bg-white border border-surface-200 rounded-lg text-gray-900
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        onChange={(e) => handleFilterChange('cuisine', e.target.value)}
        value={filters.cuisine}
      >
        <option value="">All Cuisines</option>
        <option value="italian">Italian</option>
        <option value="mexican">Mexican</option>
        <option value="indian">Indian</option>
        <option value="chinese">Chinese</option>
      </select>

      <div className="flex flex-wrap gap-3">
        {dietaryOptions.map(option => (
          <label key={option} className="flex items-center gap-2 text-gray-900">
            <input
              type="checkbox"
              value={option}
              checked={filters.dietaryRestrictions.includes(option)}
              onChange={(e) => {
                const newDietary = e.target.checked
                  ? [...filters.dietaryRestrictions, option]
                  : filters.dietaryRestrictions.filter(item => item !== option);
                handleFilterChange('dietaryRestrictions', newDietary);
              }}
              className="w-4 h-4 text-primary-600 border-surface-200 rounded
                         focus:ring-primary-500"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>

      <select
        className="px-3 py-2 bg-white border border-surface-200 rounded-lg text-gray-900
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        onChange={(e) => handleFilterChange('cookingTime', e.target.value)}
        value={filters.cookingTime}
      >
        <option value="all">Any Time</option>
        <option value="quick">Quick (&lt; 30 mins)</option>
        <option value="medium">Medium (30-60 mins)</option>
        <option value="long">Long (&gt; 60 mins)</option>
      </select>
    </div>
  );
};

export default RecipeFilters; 
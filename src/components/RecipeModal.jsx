const RecipeModal = ({ recipe, onClose, isFavorite, onToggleFavorite }) => {
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: recipe[`strIngredient${i}`],
        measure: recipe[`strMeasure${i}`]
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-72 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-2 hover:bg-white transition-colors"
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">{recipe.strMeal}</h2>
            <button
              onClick={onToggleFavorite}
              className={`p-2 rounded-full ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
            >
              <svg className="w-8 h-8" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
              <ul className="space-y-3">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-surface-400">
                    <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                    <span className="font-medium text-gray-900">{item.measure}</span>
                    {item.ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Instructions</h3>
              <p className="text-surface-400 whitespace-pre-line leading-relaxed">
                {recipe.strInstructions}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeModal 
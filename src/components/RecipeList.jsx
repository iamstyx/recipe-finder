const RecipeList = ({ recipes, onRecipeSelect }) => {
  if (!recipes.length) {
    return (
      <div className="text-center mt-12 text-surface-400">
        <img 
          src="/empty-plate.svg" 
          alt="No recipes" 
          className="w-32 h-32 mx-auto mb-4 opacity-50"
        />
        <p className="text-lg">No recipes found. Try searching for something else!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {recipes.map((recipe) => (
        <div
          key={recipe.idMeal}
          className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-surface-200"
          onClick={() => onRecipeSelect(recipe)}
        >
          <div className="relative">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
              {recipe.strMeal}
            </h3>
            <div className="flex items-center gap-4 text-sm text-surface-400">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
                {recipe.strCategory}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
                {recipe.strArea}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList; 
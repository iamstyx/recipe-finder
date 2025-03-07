const RecipeSuggestions = ({ recipes, onRecipeSelect }) => {
  if (!recipes.length) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Suggested Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={() => onRecipeSelect(recipe)}
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                {recipe.strMeal}
              </h3>
              <p className="text-surface-400 text-sm mt-2">
                {recipe.strCategory}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSuggestions; 
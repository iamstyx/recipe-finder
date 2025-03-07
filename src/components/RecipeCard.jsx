const RecipeCard = ({ recipe, onSelect, isFavorite, onToggleFavorite }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <img 
        src={recipe.image} 
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold">{recipe.title}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(recipe);
            }}
            className="text-2xl"
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
        <p className="text-gray-600 mt-2">
          {recipe.cookTime} • {recipe.difficulty}
        </p>
        <button
          onClick={() => onSelect(recipe)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard; 
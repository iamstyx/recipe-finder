import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import RecipeList from './components/RecipeList'
import RecipeModal from './components/RecipeModal'
import RecipeFilters from './components/RecipeFilters'
import RecipeSuggestions from './components/RecipeSuggestions'

const MEALDB_API_URL = 'https://www.themealdb.com/api/json/v1/1'

const App = () => {
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [loading, setLoading] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [suggestedRecipes, setSuggestedRecipes] = useState([])
  const [activeFilters, setActiveFilters] = useState({
    cuisine: '',
    dietaryRestrictions: [],
    cookingTime: 'all'
  });
  const [originalRecipes, setOriginalRecipes] = useState([]);

  const searchRecipes = async (searchTerm) => {
    setLoading(true)
    try {
      const response = await fetch(`${MEALDB_API_URL}/search.php?s=${searchTerm}`)
      const data = await response.json()
      const fetchedRecipes = data.meals || []
      setOriginalRecipes(fetchedRecipes)
      setRecipes(fetchedRecipes)
    } catch (error) {
      console.error('Error fetching recipes:', error)
      setOriginalRecipes([])
      setRecipes([])
    } finally {
      setLoading(false)
    }
  }

  const getRecipeDetails = async (id) => {
    try {
      const response = await fetch(`${MEALDB_API_URL}/lookup.php?i=${id}`)
      const data = await response.json()
      return data.meals?.[0]
    } catch (error) {
      console.error('Error fetching recipe details:', error)
      return null
    }
  }

  const handleRecipeSelect = async (recipe) => {
    const details = await getRecipeDetails(recipe.idMeal)
    setSelectedRecipe(details)
  }

  const toggleFavorite = (recipe) => {
    setFavorites(prev => {
      const isFavorite = prev.some(fav => fav.idMeal === recipe.idMeal);
      if (isFavorite) {
        return prev.filter(fav => fav.idMeal !== recipe.idMeal);
      }
      return [...prev, recipe];
    });
  }

  const getRandomRecipes = async () => {
    try {
      const promises = Array(3).fill().map(() => 
        fetch(`${MEALDB_API_URL}/random.php`)
          .then(res => res.json())
      );
      const results = await Promise.all(promises);
      return results.map(result => result.meals[0]);
    } catch (error) {
      console.error('Error fetching random recipes:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadSuggestions = async () => {
      const suggestions = await getRandomRecipes();
      setSuggestedRecipes(suggestions);
    };
    loadSuggestions();
  }, []);

  const filterRecipes = (recipes, filters) => {
    return recipes.filter(recipe => {
      if (filters.cuisine && recipe.strArea.toLowerCase() !== filters.cuisine.toLowerCase()) {
        return false;
      }

      if (filters.cookingTime !== 'all') {
        const instructions = recipe.strInstructions.toLowerCase();
        switch (filters.cookingTime) {
          case 'quick':
            if (instructions.includes('hour') || instructions.includes('hrs')) return false;
            break;
          case 'medium':
            if (!instructions.includes('30') && !instructions.includes('hour')) return false;
            break;
          case 'long':
            if (!instructions.includes('hour') && !instructions.includes('hrs')) return false;
            break;
        }
      }

      if (filters.dietaryRestrictions.length > 0) {
        const ingredients = Object.keys(recipe)
          .filter(key => key.startsWith('strIngredient') && recipe[key])
          .map(key => recipe[key].toLowerCase());

        const isVegetarian = !ingredients.some(ingredient => 
          ['chicken', 'beef', 'pork', 'fish', 'meat'].some(meat => ingredient.includes(meat))
        );

        const isDairyFree = !ingredients.some(ingredient => 
          ['milk', 'cheese', 'cream', 'yogurt', 'butter'].some(dairy => ingredient.includes(dairy))
        );

        if (filters.dietaryRestrictions.includes('Vegetarian') && !isVegetarian) return false;
        if (filters.dietaryRestrictions.includes('Dairy-Free') && !isDairyFree) return false;
      }

      return true;
    });
  };

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
    const filteredResults = filterRecipes(originalRecipes, newFilters);
    setRecipes(filteredResults);
  };

  return (
    <div className="min-h-screen bg-surface-50">
      <nav className="bg-white border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-primary-600">Recipe Finder</h1>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <SearchBar onSearch={searchRecipes} />
          <RecipeFilters onFilterChange={handleFilterChange} />
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : !recipes.length ? (
            <RecipeSuggestions 
              recipes={suggestedRecipes}
              onRecipeSelect={handleRecipeSelect}
            />
          ) : (
            <RecipeList 
              recipes={recipes}
              onRecipeSelect={handleRecipeSelect}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </div>
      </main>

      {selectedRecipe && (
        <RecipeModal 
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          isFavorite={favorites.some(fav => fav.idMeal === selectedRecipe.idMeal)}
          onToggleFavorite={() => toggleFavorite(selectedRecipe)}
        />
      )}
    </div>
  )
}

export default App

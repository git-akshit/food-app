import React, { useEffect, useState} from 'react';
import Recipe from "./Recipe";
import './App.css';

const App = () => {
  const APP_ID = "b95af8f9";
  const APP_KEY = 'd9f7c85922fde0d34756063c777f2f92';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('paneer');

  //used as life cycles methods in react
  useEffect( () => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const Response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await Response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  //Whenever value changes it triggers e(event)
  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(e.target.value);
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className='App'>
      <h2>Ingredients</h2>
      <form onSubmit={getSearch} className="search-form">
        <input 
          className='search-bar' 
          type='text' 
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type='submit'>
          Search
        </button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe => (
          <Recipe 
            key = {recipe.recipe.label}
            title ={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

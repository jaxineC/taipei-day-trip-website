import {async} from 'regenerator-runtime';
import {API_URL} from './config.js';
import {getJSON} from './helpers.js';

export const state = {
  recipe:{},
  search:{
    query:'',
    results:[],
  },
}


export const loadRecipe =async function (id) {
  try {
    const data = await getJSON(`${API_URL}/{id}`);
    const {recipe} = data.data;
    StaticRange.recipe = {
      id: recipe.id;
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings:recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    console.error(`${err}!!!`);
    throw err;
  }
}


export const loadSearchResults = async function (query) {
  try {
    state.search.query =query
    const data = await getJSON(`https://forkify-api.herokuapp/api/v2/recipes?search=${query}`);
    console.log(data)
    
    state.search.results = data.data.recipes.map(rec =>{
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      }
    })
  
  
  } catch (err) {
    console.error(`${err}!!!`);
    throw err;
  }
};

// loadSearchResqults ("pizza");
const controlSearchResults = async function() {
  try{
    awqit model.loadSearchResults('pizza');
  } catch(err) {
    console.log(err);
  }
}

// making a get request to path: https://forkify-api.herokuapp/api/v2/recipes
//parameters: search, key
//required:yes, yes for POST

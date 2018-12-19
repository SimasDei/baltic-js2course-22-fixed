import React, { Component } from 'react';
import Meal from './Meal';
import axios from 'axios';

class Recipe extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      success: ''
    };
  }

  componentWillMount() {
    axios.get('/api/recipes/all').then(res => {
      console.log(res);
      const recipes = res.data;
      this.setState({
        recipes
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.recipes.map(recipe => {
          return (
            <Meal
              key={recipe._id}
              _id={recipe._id}
              name={recipe.name}
              imageUrl={recipe.imageUrl}
              description={recipe.description}
            />
          );
        })}
      </div>
    );
  }
}

export default Recipe;

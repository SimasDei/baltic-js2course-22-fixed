import React, { Component } from 'react';
import Meal from './Meal';
import axios from 'axios';

class Recipe extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      success: '',
      pageNumber: 0
    };
  }

  componentWillMount() {
    debugger;
    this.loadMore();
  }

  loadMore = pageNumber => {
    pageNumber = this.state.pageNumber;
    axios.get(`/api/recipes/pagination/${pageNumber}`).then(res => {
      console.log(res);
      const recipes = res.data;
      pageNumber++;
      this.setState({
        recipes,
        pageNumber
      });
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // getRecipes = () => {
  //   axios.get('/api/recipe/all').then(res => {

  //   })
  // }

  render() {
    return (
      <div>
        {this.state.recipes.map(recipe => {
          return (
            <div key={recipe._id} id={'theTop'}>
              <Meal
                _id={recipe._id}
                name={recipe.name}
                imageUrl={recipe.imageUrl}
                description={recipe.description}
                date={recipe.date}
              />
            </div>
          );
        })}
        <button
          href="#theTop"
          className={'btn btn-primary btn-block col-sm-6 offset-3'}
          onClick={this.loadMore.bind(this, this.state.pageNumber)}
        >
          Load More
        </button>
      </div>
    );
  }
}

export default Recipe;

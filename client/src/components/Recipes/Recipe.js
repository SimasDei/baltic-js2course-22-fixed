import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Recipe extends Component {
  constructor() {
    super();
    this.state = {
      recipes: []
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

  onClickHandler = _id => {
    axios.delete('api/recipes/delete/' + _id).then(res => {
      console.log(res);
    });
  };

  render() {
    return (
      <div>
        {this.state.recipes.map(recipe => {
          return (
            <div
              key={recipe._id}
              className="card col-sm-6 offset-3"
              style={{ width: '18rem' }}
            >
              <img
                className="card-img-top"
                src={recipe.imageUrl}
                alt={recipe.name}
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text">{recipe.description}</p>
                <Link
                  to={'recipes/update/' + recipe._id}
                  className={'btn btn-primary'}
                >
                  Update
                </Link>
                <button
                  className={'btn btn-danger'}
                  onClick={this.onClickHandler.bind(this, recipe._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Recipe;

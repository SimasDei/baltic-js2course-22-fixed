import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

  onClickHandler = _id => {
    axios.delete('api/recipes/delete/' + _id).then(res => {
      this.setState({ success: res.data.deleted });
      return <div>Data Deleted</div>;
    });
  };

  render() {
    return (
      <div>
        {this.state.recipes.map(recipe => {
          return (
            <div key={recipe._id} className={'col-sm-6 offset-3'}>
              <div className="card center mb-5">
                <img
                  className="card-img-top"
                  src={recipe.imageUrl}
                  alt={recipe.name}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text">{recipe.description}</p>
                  <Link
                    to={'recipes/update/' + recipe._id}
                    className={'btn btn-primary'}
                  >
                    Update
                  </Link>
                  <button
                    className={'btn btn-danger ml-2'}
                    onClick={this.onClickHandler.bind(this, recipe._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Recipe;

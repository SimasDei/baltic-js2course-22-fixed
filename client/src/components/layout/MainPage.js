import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Meal from '../Recipes/Meal';
import axios from 'axios';

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      searchTerm: ''
    };
  }

  componentWillMount() {}

  onChangeHandler = e => {
    let searchTerm = e.target.value;
    this.setState({ searchTerm: searchTerm });
  };

  onClickHandler = e => {
    e.preventDefault();
    console.log(this.state.searchTerm);
    axios
      .get(`/api/recipes/search/${this.state.searchTerm}`)
      .then(res => {
        const recipes = res.data;
        this.setState({
          recipes
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="mainPage">
        <div className="dark-overlay mainPage-inner text-light">
          <div className="container">
            <div className="row mainHeading">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-2">A Recipe Thing </h1>
                <p className="lead"> Create and Browse Recipes !</p>
                <hr />
                <Link to="/recipes" className="btn btn-lg btn-success m-2">
                  Enter
                </Link>
              </div>
            </div>
            <div className="row mt-2">
              <form action="" className="col-md-8 offset-2 text-center">
                <div className=" form-group">
                  <input
                    onChange={this.onChangeHandler}
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Search for a Recipe"
                    value={this.state.searchTerm}
                  />
                  <button
                    onClick={this.onClickHandler}
                    className="btn btn-primary btn-lg mt-4"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="searchContainer">
            {this.state.recipes.map(recipe => {
              return (
                <div key={recipe._id}>
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
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;

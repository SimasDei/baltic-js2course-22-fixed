import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MainPage from './components/layout/MainPage';
import Recipe from './components/Recipes/Recipe';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={MainPage} />
          <div className="container">
            <Route exact path="/recipes" component={Recipe} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

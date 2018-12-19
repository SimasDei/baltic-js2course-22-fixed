import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MainPage extends Component {
  render() {
    return (
      <div className="mainPage">
        <div className="dark-overlay mainPage-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">A Recipe Thing </h1>
                <p className="lead"> Create and Browse Recipes !</p>
                <hr />
                <Link to="/recipes" className="btn btn-lg btn-success mr-2">
                  Enter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;

import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Meal = props => {
  const onClickHandler = _id => {
    axios.delete('api/recipes/delete/' + _id).then(res => {
      console.log(res);
      return <div>Data Deleted</div>;
    });
  };

  return (
    <div key={props._id} className={'col-sm-6 offset-3'}>
      <div className="card center mb-5">
        <img className="card-img-top" src={props.imageUrl} alt={props.name} />
        <div className="card-body text-center">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
          <Link
            to={'recipes/update/' + props._id}
            className={'btn btn-primary'}
          >
            Update
          </Link>
          <button
            className={'btn btn-danger ml-2'}
            onClick={onClickHandler.bind(this, props._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Meal;

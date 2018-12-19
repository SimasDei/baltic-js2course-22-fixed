const express = require('express');
const router = express.Router();

// Load Recipe Model
const Recipe = require('../../models/Recipe');

//@route GET api/recipes
//@desc Test Recipes route
router.get('/', (req, res) => res.json({ msg: 'Recipes Route OK' }));

//@route POST api/recipes/add
//@desc ADD a recipe
router.post('/add', (req, res) => {
  // use Recipe model to create a new Recipe with form input data
  const newRecipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl
  });
  // Save user to the DB
  newRecipe
    .save()
    .then(recipe => res.json(recipe))
    .catch(err => console.log(err));
});

module.exports = router;

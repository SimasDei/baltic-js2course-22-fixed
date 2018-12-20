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

//@route GET api/recipes/all
//@desc Get all recipes
router.get('/all', (req, res) => {
  Recipe.find()
    .then(recipes => res.json(recipes))
    .catch(err => console.log(err));
});

//@route GET api/recipes/pagination
router.get('/pagination/:pageNumber', (req, res) => {
  let pageNumber = req.params.pageNumber;
  let itemsPerPage = 5;
  Recipe.find({ createdOn: { $lte: req.createdOnBefore } })
    .skip(itemsPerPage * pageNumber)
    .limit(itemsPerPage)
    .sort('-createdOn')
    .then(recipes => res.json(recipes))
    .catch(err => console.log(err));
});

//@route GET api/recipes/:search
//@ Use mongoDB search with the param given
router.get('/search/:search', (req, res) => {
  let search = req.params.search;
  Recipe.find({
    $text: { $search: search }
  }).then(recipes => res.json(recipes).catch(err => console.log(err)));
});

//@route GET api/recipes/:id
//@ Get recipe by it's ID
router.get('/:_id', (req, res) => {
  Recipe.findOne({ _id: req.params._id })
    .then(recipe => {
      if (!recipe) {
        res.status(404);
        console.log('No recipe found');
      }
      res.json(recipe);
    })
    .catch(err => res.status(404).json(err));
});

//@ Route PUT api/recipes/update/:id
//@ Desc find a Recipe and Update the info
router.put('/update/:_id', (req, res) => {
  Recipe.findByIdAndUpdate(
    req.params._id,
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl
      }
    },
    { new: true }
  )
    .then(recipe => res.json(recipe))
    .catch(err => res.status(404).json(err));
});

//@ Route DELETE api/recipes/delete/:id
//@ Desc Delete selected document from the DB
router.delete('/delete/:_id', (req, res) => {
  Recipe.findByIdAndDelete(req.params._id)
    .then(
      res.status(200).json({ deleted: 'Successfully deleted the Document' })
    )
    .catch(err => res.status(404).json(err));
});

module.exports = router;

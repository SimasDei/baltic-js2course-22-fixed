const express = require('express');
const router = express.Router();

//@route GET api/recipes
//@desc Test Recipes route
router.get('/', (req, res) => res.json({ msg: 'Recipes Route OK' }));

module.exports = router;

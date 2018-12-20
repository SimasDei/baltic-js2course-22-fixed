const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

RecipeSchema.index(
  {
    name: 'text',
    description: 'text'
  },
  {
    weights: {
      name: 5,
      description: 1
    }
  }
);

// Export Model
module.exports = Recipe = mongoose.model('recipes', RecipeSchema);

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const recipes = require('./routes/api/recipes');

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db =
  'mongodb+srv://SimasDei:02894145@baltic-react-mongodb-one-l0d3u.mongodb.net/recipes?retryWrites=true';
// Connect to DB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connection to DB Established, Captain! o/'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/recipes', recipes);

// Test BackEnd
app.get('/', (req, res) => res.send('Ahoy Sailor o/'));

const port = 2000;

app.listen(port, () => console.log(`Server started on port: ${port}`));

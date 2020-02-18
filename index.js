const express = require('express');
const morgan = require('morgan');
const playstoreData = require('./playstore');

const app = express();

app.use(morgan('dev'));

app.get('/apps', (req,res) => {
  const {sort, genres = ''} = req.query;

  if (sort) {
    if (!['Rating', 'App'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of rating or app');
    }
  }
  if (genres) {
    if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']
      .includes(genres)) {
      return res
        .status(400)
        .send('App Genre should be Action, Puzzle, Strategy, Casual, Arcade, Card');
    }
  }

  let results = playstoreData
    .filter(playstoreData => 
      playstoreData
        .Genres
        .toLowerCase()
        .includes(genres.toLowerCase())
    );
            

  res.json(results);
});

app.listen(8000, () => {
  console.log('Express Server is listening on port 8000');
});
const express = require('express');
const morgan = require('morgan');
const playstoreData = require('./playstore');

const app = express();

app.use(morgan('dev'));

app.get('/apps', (req,res) => {
  const {sort, genres = ''} = req.query;

  let results = playstoreData
    .filter(app => 
      app
        .Genres
        .toLowerCase()
        .includes(genres.toLowerCase())
    );
            

  res.json(results);
});

app.listen(8000, () => {
  console.log('Express Server is listening on port 8000');
});
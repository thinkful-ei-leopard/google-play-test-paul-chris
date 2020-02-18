const express = require('express');
const morgan = require('morgan');
const playstoreData = require('./playstore');

const app = express();
app.use(morgan('dev'));

app.get('/', (req,res) => {
 

  res.json(playstoreData);
});

app.listen(8000, () => {
  console.log('Express Server is listening on port 8000');
});
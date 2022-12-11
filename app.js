const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5001;

const app = express();

app
  .use('/index', express.static('views/index.html'))
  .get('/', (req, res, next) => res.redirect('/index'))
  .use(express.static(path.join(__dirname, 'public')))
  .listen(PORT, () => console.log(`Server started on localhost:${PORT}`));

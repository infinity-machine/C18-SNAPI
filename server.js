const express = require('express');
const db = require('./config/connection');
const user_routes = require('./api_routes/user_routes');

const PORT = process.env.PORT || 6969;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', user_routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
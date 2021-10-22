const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');

const route = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.use(express.json());

app.engine('hbs', handlebars({
    extname: '.hbs',
    helpers: {
      
    }
  }));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//route init
route(app);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

// Setup Sequelize for DB
const db = require('./config/database');

//Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

// Setup App
const app = express();
app.get('/', (req, res) => res.end('INDEX'));
app.get('/user', (req, res) => res.render('login'));
app.get('/stats', (req, res) => res.render('stats'));


// app.get('/', (req, res) => res.render('views/index'));

// Setup Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set static folder
app.use(express.static(path.join(__dirname,'public')));

// Routes
app.use('/countries', require('./routes/countries.js'));
app.use('/map', require('./routes/map.js'))

// Set static folder (css, bilder etc.)
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on ${PORT}`));

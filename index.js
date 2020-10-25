const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

//Database 
const db = require('./config/database');


//test the database
db.authenticate()
.then(() => console.log('Database connected!'))
.catch(err => console.log('Error: ' + err))

const app = express();

//body parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));



//user routes
app.use('/users', require('./routes/userRoutes'));
app.use('/userGoals', require("./routes/userGoalsRoutes"));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('ok'));


app.listen(PORT, console.log(`Server started OK on port ${PORT}`));

const express = require('express')
const mysql = require('mysql')
const dotenv = require('dotenv')
const path = require('path')
const hbs = require('hbs')

dotenv.config({ path: __dirname } + './env')

const db = mysql.createConnection({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWD,
   database: process.env.DATABASE_NAME,
})

db.connect((error) => {
   error
      ? console.log(error)
      : console.log("You've successfully connect to database")
})

const App = express()

const PublicDirectory = path.join(__dirname, './public')
App.use(express.static(PublicDirectory))
App.use(express.urlencoded({ extended: false }))
App.use(express.json())

App.set('view engine', 'hbs')

// App.get("/", (req, res) => {
//      res.render("index");
// });

// App.get("/register", (req, res) => {
//      res.render("register");
// });

App.use('/', require('./router/pages'))
App.use('/auth', require('./router/auth'))

App.listen(3000, () => {
   console.log('App is listening at the port 3000')
})

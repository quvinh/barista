const express = require('express')

const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const methodOverride = require('method-override') //npm i method-override
const morgan = require('morgan')

const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')
const User = require('./models/user')


const app = express()
// app.use(bodyParser.json()) 
app.set('view engine', 'ejs')
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

// for authentication---
app.use(require('express-session')({
    secret:"Zinh dep troai",
    resave: false,
    saveUninitialized: false
}))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
passport.use(new LocalStrategy(User.authenticate()))

app.use(passport.initialize())
app.use(passport.session())
// ----------------------
const connectDB = require('./config/db')



//Load config
dotenv.config({ path: './config/config.env' })
connectDB()

//Route
app.use('/', require('./routes/index'))

app.listen(process.env.PORT || 5500)
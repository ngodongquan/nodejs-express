// environment variables
require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/express-demo')

// cookie 
var cookieParser = require('cookie-parser')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(cookieParser(process.env.SECRET_COOKIES)) //singed cookies

//post
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//middleware 
const middlewareAuth = require('./middleware/auth.middleware')

//auth Routes 
const authRoute = require('./routes/auth.routes')
app.use('/auth', authRoute)

// user Routes
const userRoute = require('./routes/user.routes')
app.use('/users', middlewareAuth.requireAuth, userRoute)

//product Routes
const productRoute = require('./routes/product.routes')
app.use('', productRoute)

//Bài 2: Template Engine
app.get('/', function (req, res) {
    res.render('index', {
        name: 'Coders Tokyo',
        born: '2018'
    }) // hai params đó là tên đường dẫn và params truyền xuống
  })


// Static path
app.use(express.static('public'))

//tao mot point de nhan request
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
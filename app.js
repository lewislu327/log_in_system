const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser') 
const White_List = require('./models/white_list')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/white-list', { useNewUrlParser: true, useUnifiedTopology: true })
const cookieParser = require('cookie-parser')
const session = require('express-session') 


const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser('55688'))
app.use(session({
  // name: 'userName',
  secret: '55688',
  resave: false,                //要查
  saveUninitialized: false,     //要查
}))

app.get('/', (req,res) => {
  const firstName = req.session.userName
  console.log(firstName)
  White_List.findOne({firstName})
  .lean()
  .then(user => {
      if (user) { 
        welcomeMSG = `You've already log-in, ${user.firstName}`
        res.render('show',{welcomeMSG} )
      } else {
        res.render('index')
      }
  })
})

app.post('/show', (req, res) => {
  const { email, password } = req.body
  const errorMsg = '帳號/密碼錯誤'
  return White_List.findOne({ email: email, password: password })
  .lean()
  .then(user => {
      if (user) {
        // res.cookie('userName', user.firstName, { signed: true, maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
        console.log(user)
        req.session.userName = user.firstName
        console.log(user.firstName)
        // console.log(req.session)
        welcomeMSG = `Welcome back, ${user.firstName}`
        res.render('show',{welcomeMSG} )
      } else {
        res.render('show', { errorMsg })
      }
  })
})

app.get('/logout', (req, res) => {
  res.clearCookie('connect.sid', { path: '/' })
  return res.redirect('/')
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
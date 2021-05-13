const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser') 
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/white-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

const users = [
 {
   firstName: 'Tony',
   email: 'tony@stark.com',
   password: 'iamironman'
 },
 {
   firstName: 'Steve',
   email: 'captain@hotmail.com',
   password: 'icandothisallday'
 },
 {
   firstName: 'Peter',
   email: 'peter@parker.com',
   password: 'enajyram'
 },
 {
   firstName: 'Natasha',
   email: 'natasha@gamil.com',
   password: '*parol#@$!'
 },
 {
   firstName: 'Nick',
   email: 'nick@shield.com',
   password: 'password'
 },
 {
   firstName: '111',
   email: '111@111',
   password: '111'
 }
]

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true}))

app.get('/', (req,res) =>
  res.render('index')
)

app.post('/show', (req, res) => {
  const email = req.body.mailaddress
  const password = req.body.password
  const approvedEmail = users.indexOf(email)
  const correctPW = users.indexOf(password)
  const name = 

  if (approvedEmail && correctPW ){
    console.log('hello')
    welcome = `Welcomeback, ${users.firstName}`
  }
  
  res.render('show', {welcome})
  
})


app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
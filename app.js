const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser') 
const White_List = require('./models/white_list')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/white-list', { useNewUrlParser: true, useUnifiedTopology: true })

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

app.get('/', (req,res) =>
  res.render('index')
)

app.post('/show', (req, res) => {
  const { email, password } = req.body
  const errorMsg = '帳號/密碼錯誤'
  return White_List.findOne({ email: email, password: password })
  .lean()
  .then(user => {
      if (user) {
        welcomeMSG = `Welcome back, ${user.firstName}`
        res.render('show',{welcomeMSG} )
      } else {
        res.render('show', { errorMsg })
      }
  })
})


app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
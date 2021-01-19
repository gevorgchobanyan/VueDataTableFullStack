const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//initialize routes
const routes = require('./routes/employees_api')
const cors = require('cors')
// const { getClient } = require('./db')
// const ObjectId = require('mongodb').ObjectId

const app = express()


//connect to mongodb
mongoose.connect('mongodb://localhost:27017/dataTableProject')
mongoose.Promise = global.Promise

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())  
app.use(routes)


//error handling middleware
app.use((err, req, res, next) =>{
  res.status(422).send({error: err.message})

})



//listen for requests
app.listen(5000, () => {
  console.log('server running at 5000')
})



require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const userRoutes = require('./routes/user')

// express app
const app = express()

app.use(cors());

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


app.use('/api/user', userRoutes)
app.use('/api/property',require("./routes/property"))
app.use('/api/like',require("./routes/like"))



// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
    
  })
  .catch((error) => {
    console.log(error)
  })

  app.listen(process.env.PORT, () => {
    console.log('connected to db & listening on port', process.env.PORT)
  })
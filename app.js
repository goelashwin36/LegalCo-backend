const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
var morgan = require('morgan')
var cookies = require("cookie-parser");
var bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;
const cors = require('cors')

app.use(cors())

app.use(cookies());

dotenv.config()

app.use(morgan('dev'))


//Connect to Mongodb
mongoose.connect(
    process.env.DB_CONNECT, { useNewUrlParser: true },
    () => {
        console.log("Connected to database!")
    })

//Middlewares
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
  
//Routes
const userAuthRoute = require('./routes/customerRoutes/customerAuthRoute')
const userRoute = require('./routes/customerRoutes/customerUserRoute')
const agentAuthRoute = require('./routes/agentRoutes/agentAuthRoute')
const agentRoute = require('./routes/agentRoutes/agentUserRoute')

const adminRoute = require('./routes/appRoutes/adminRoutes')
const appRoute = require('./routes/appRoutes/appRoutes')
const getRoute = require('./routes/getRoute')


app.use('/api/user', userAuthRoute)
app.use('/api/user', userRoute)
app.use('/api/agent', agentAuthRoute)
app.use('/api/agent', agentRoute)
app.use('/api/admin', adminRoute)
app.use('/api/general', appRoute)

//Server
app.listen(PORT, () => console.log("Up and running!!"))

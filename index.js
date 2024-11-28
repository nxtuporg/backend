const express = require('express');
const dotenv = require("dotenv").config()
const connectDB = require("./config/db.js");
const app = express();
connectDB();


const cors = require('cors');
app.use(cors());            
const PORT = process.env.PORT || 6969

app.get('/',(req,res)=>{
    res.json("working")
})


const eventsRoutes = require('./src/routes/eventsRoutes.js')
const messmenuRoutes = require('./src/routes/messmenuRoutes.js')
const clubRoutes = require('./src/routes/clubRoutes.js')
const carouselRoutes = require('./src/routes/carouselRoutes.js')

app.use('/api/events',eventsRoutes)
app.use('/api/messmenu',messmenuRoutes)
app.use('/api/clubs',clubRoutes)
app.use('/api/carousel',carouselRoutes)

app.use(express.json());


module.exports = app;



app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})


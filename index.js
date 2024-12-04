const express = require('express');
const dotenv = require("dotenv").config()
const connectDB = require("./config/db.js");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swaggerOptions.js');
connectDB();

app.use(express.json()); 


const cors = require('cors');
app.use(cors());            
const PORT = process.env.PORT || 6969

app.get('/',(req,res)=>{
    res.json("working")
})
 

const eventsRoutes = require('./src/routes/eventsRoutes.js')
const clanRoutes = require('./src/routes/clanRoutes.js')
const clubRoutes = require('./src/routes/clubRoutes.js')
const carouselRoutes = require('./src/routes/carouselRoutes.js')
const authRoutes = require("./src/routes/authRoutes.js");
const imageRoutes = require("./src/routes/imageRoute.js")

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/events',eventsRoutes)
app.use('/api/clans',clanRoutes)
app.use('/api/clubs',clubRoutes)
app.use('/api/carousel',carouselRoutes)
app.use("/api/user", authRoutes);
app.use("/api/uploadImage", imageRoutes);


app.use(express.json());


module.exports = app;



app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})


const mongoose = require("mongoose")


const eventSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    description: {type:String,unique:true,required:true},
    image: {type:JSON,required:true},
    link: {type:String,required:true},
    rel_id: {type:String,unique:true,required:true},
})

const Events = mongoose.model('Events', eventSchema);

module.exports = Events;



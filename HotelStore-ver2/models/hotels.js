var mongoose = require("mongoose");

var hotelSchema = new mongoose.Schema({
	name:String,
	img:String,
    description:String,
    address:String,
    price:String,
    created: {type:Date , default:Date.now},
    author:{
        id: {
 
             type:mongoose.Schema.Types.ObjectId,
             ref:"User"
         },
         username:String
     },
	comments:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment" 
        }
    ]
})

var Hotel = mongoose.model("Hotel" , hotelSchema)

module.exports = Hotel;
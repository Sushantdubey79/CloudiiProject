var mongoose = require("mongoose");

var hotelSchema = new mongoose.Schema({
	name:String,
    image:[
        {
            url:String,
            filename:String
        }
    ],  
    description:String,
    address:String,
    price:String,
    created: {type:Date , default:Date.now},
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    author:{
        id: {
 
             type:mongoose.Schema.Types.ObjectId,
             ref:"User"
         },
         username:String
     },
	comments:[
        {
        author:{
            id: {
 
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }, 
        },
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment" 
        }
    ]
})

var Hotel = mongoose.model("Hotel" , hotelSchema)

module.exports = Hotel;
const Mongoose = require('mongoose')
const Schema = Mongoose.Schema


const BookSchema = new Schema ({
    Book:{
        type:String,
        required:true
    },
    Author:{
        type:String,
        required:true
    },
    Language:{
        type:String,
        required:true
    },
    Characters:{
        type:String,
        required:true
    },
    About:{
        type:String,
        required:true
    }
})
    // },
    // img:{
    //     data: Buffer,
    //     contentType: String,
        

    // }
    
    // const imageSchema = new Schema({
    //     url: {
    //         type: String
    //     },
    //     userId: {
    //         type: mongoose.Schema.Types.ObjectId
    //     }
    // });

let BookDATA = Mongoose.model('bookdetails',BookSchema)

module.exports = BookDATA
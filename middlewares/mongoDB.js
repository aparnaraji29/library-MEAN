//connect mongodb
const Mongoose = require('mongoose')
Mongoose.connect('mongodb+srv://aparnaraji2000:Aparna29@cluster0.bswwvwk.mongodb.net/Projectdemo?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log('mongodb connected successfully')
})
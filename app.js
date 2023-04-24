const Express = require('express')
const Cors = require('cors')
const Morgan = require('morgan')

const PORT = 3000;

const app = Express()

require('./middlewares/mongoDB') //init mongodb


app.use(Cors())  //to connect frontend with backend without any disturbance
app.use(Express.json())  //to recieve data from frontend
app.use(Express.urlencoded({extended:true}))
app.use(Morgan('dev'))


const path=require('path');
app.use(Express.static(path.join(__dirname+'./dist/frontend')));
//api
const api = require('./routes/api')
app.use('/api',api)


//authentication
const jwt = require('jsonwebtoken')
app.post('/auth' ,async (req,res)=>{

    try {
        let { email,password } =req.body
    console.log(req.body)
    if(email=='aparnaraji2000@gmail.com' && password =='aparna123'){
        let payload ={email:email,password:password}
        let token = jwt.sign(payload,'ilikeapples13')
        console.log(token)
        res.status(200).json({ message: 'Authentication successful',status:200,token:token })
    }
    else{
        throw('unauthorized')
    }
    } 
    catch (error) {
        console.log(error)
     res.status(400).json({message:error})
    }
       
   })


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
});



app.listen(PORT, ()=>{
    console.log(`...........server started at port ${PORT}.........`)
})
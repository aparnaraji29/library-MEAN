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
app.use(Express.static(path.join(__dirname+'/dist/frontend')));
//api
const api = require('./routes/api')
app.use('/api',api)


//authentication


console.log(path.join(__dirname + '/dist/frontend/index.html'))
//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
});



app.listen(PORT, ()=>{
    console.log(`...........server started at port ${PORT}.........`)
})
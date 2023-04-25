const Express = require('express')
const Router = Express.Router()

const DATA = require('../model/book') 
const jwt = require('jsonwebtoken')
Router.post('/auth' ,async (req,res)=>{

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
function verifyToken(req,res,next) {

    try {
        if (!req.headers.authorization) throw ('unauthorized JWT')
        let token = req.headers.authorization.split(' ')[1]
        if (!token) throw ('unauthorized JWT')

        let payload = jwt.verify(token, 'ilikeapples13')

        if (!payload) throw ('unauthorized JWT')

        // res.status(200).send(payload)
        next()

    } catch (error) {
        console.log(error)
        res.status(401).send(error)
    }



}


Router.get('/api/booklist', async(req,res)=>{

    try {
        
        const list = await DATA.find()
        res.send(list)
        res.json({data:books,message:"success"}).status(200)
        
    } catch (error) {
        console.log(error)
        res.json({message:error}).status(400)
    }
})


Router.post('/api/book',verifyToken, async(req,res)=>{
    
    try {

        let item = {  //to fetch and save data from frontend in server
            Book : req.body.Book,
            Author : req.body.Author,
            Language : req.body.Language,
            Characters:req.body.Characters,
            About : req.body.About
           }
           let token = req.headers
           console.log('token from front end',token)
           if(item== null) throw ('no data')

            const newBook = new DATA(item)   //to check incoming data 
            const saveBook = await newBook.save()  //mongodb save
            res.json({ message: 'Data saved successfully' }).status(201)
            res.send(saveBook)
            
    } catch (error) {
        console.log(error)
        res.json({message:error}).status(400)
    }
})



Router.delete('/api/book/:id',verifyToken, async(req,res)=>{
    
    try {
        let token = req.headers.authorization
        console.log('token from front end',token)

        let id = req.params.id
        const deleteBook = await DATA.findByIdAndRemove(id)
        res.json({message :'Data deleted succesfully'}).status(200)
        res.send(deleteBook)
        
    } catch (error) {
        console.log(error)
        res.json({message:error}).status(400)
    }
})




Router.put('/api/book/:id',verifyToken , async(req,res)=>{
    
    try {
        
        let id = req.params.id

        let item = {  //to fetch and save data from frontend in server
            Book : req.body.Book,
            Author : req.body.Author,
            Language : req.body.Language,
            Characters:req.body.Characters,
            About : req.body.About
         }
         
         let token = req.headers.authorization
         console.log('token from front end',token) 
         const updateData = { $set :item }

        const updateBook = await DATA.findByIdAndUpdate( id, updateData)
        res.json({message :'Data updated succesfully'}).status(200)
        res.send(updateBook)
   
    } catch (error) {
        console.log(error)
        res.json({message:error}).status(400) 
    }
})



Router.get('/api/book/:id', async(req,res)=>{
    
    try {

        let id = req.params.id
        const singleBook = await DATA.findById({_id:id})
        res.send(singleBook)
        
    } catch (error) {
        console.log(error)

        
    }
})

module.exports = Router
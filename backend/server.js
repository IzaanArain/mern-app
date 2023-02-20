
const path=require('path');
const express=require('express');
const dotenv=require('dotenv').config()
const colors=require('colors')
const {errorHandler}=require('./middleware/errorMiddleware')
const connectDB=require('./config/db')

connectDB();

const app=express()

app.use(express.json()); // this middelware added to use body data in controller 
app.use(express.urlencoded({extended:false})); // this middelware added to use body data in controller

app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/users',require('./routes/userRoutes'))

//for App deployment
//Serve fontend // change NODE_ENV to production
// if(process.env.NODE_ENV==='production'){
//     app.use(express.static(path.join(__dirname,'../frontend/build')))


//     app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html')))
// }else{
//     app.get('/',(req,res)=>res.send('please set to production'))
// }

app.use(errorHandler)

PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server start at PORT: ${PORT}`)
})
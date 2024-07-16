const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors');
const app = express();
app.use(express.json())             
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true
}))

app.use(cors());


const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.json({msg:"This is Example"})
})

app.listen(PORT,() => {
    console.log("SERVER IS RUNNING ...")
})

//Routes 
app.use('/user',require('./routes/userRouter'))

app.use('/api',require('./routes/categoryRouter'))
app.use('/api',require('./routes/upload'))

app.use('/api',require('./routes/productRouter'))


const URI = process.env.MONGODB_URL;

mongoose.connect(URI,{
   
    dbName:"Userr",
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("MongoDB Connected")
}).catch(err => {
    console.log(err)
})

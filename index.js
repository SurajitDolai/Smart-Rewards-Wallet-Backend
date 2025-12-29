const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const Route = require('./MVC/View/Enquire_Route');
require('dotenv').config();
const app=express();
app.use(cors());
app.use(express.json());

app.use('/api/users',Route);


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port: ${process.env.PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});
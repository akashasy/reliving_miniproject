import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
const app= express();
// app.use(express.json());
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use('/posts',postRoutes);


const CONNECTION_URL='mongodb+srv://akash_yadav:asy9936210047@cluster0.z4o6i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT=process.env.PORT||5000;
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
// app.get('/',(req,res)=>res.status(200).send("Running"));
// app.listen(PORT,)
.then(()=> app.listen(PORT,()=>console.log(`Server Running on ${PORT}`)))
.catch((error)=>console.log(error.message));
//mongoose.set('useFindAndModify',false);


const express=require ('express');
const mongoose=require('mongoose');
const cors=require ('cors');
const app=express();
app.use(cors());
app.use(express.json());
const todoModel=require('./models/todo');
const TodoModel = require('./models/todo');


//db connection


mongoose.connect("mongodb://localhost:27017/todoss",{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('Conectado a MongoDB'))
    .catch((error)=> console.log(error));

app.post('/add',(req,res)=>{
    const task=req.body.task;
    todoModel.create({task:task})
    .then(result=>console.log(result))
    .catch(err=>console.log(err));

})


app.get('/get',(req,res) =>{
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))



})

app.put('/update/:id',(req,res)=>{
    const id=req.params.id;

todoModel.findByIdAndUpdate({_id:id},{done:true}).
then(result=>res.json(result)).
catch(err=>res.json(err));
})


app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id;

    todoModel.findByIdAndDelete({_id:id}).
    then(result=>res.json(result)).
    catch(err=>res.json(err));

})
app.listen(3001,()=>{
    console.log("Server is running on port 3001");
})
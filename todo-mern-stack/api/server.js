const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect

mongoose.connect('mongodb://localhost:27017/react-todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch(console.error);





const Todo = require('./model/Todo');

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
})

app.post('/todo/new', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    })
    todo.save();
    res.json(todo);
})

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
})

app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
})




app.listen(3001, () => console.log("server started on port 3001"));
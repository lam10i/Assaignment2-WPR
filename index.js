const express=require('express');
const mongoose=require('mongoose');
const app=express();
//use cor libary to fetch api suceesssully
const cors=require('cors');
app.use(cors({
    origin:"*"
}));
/*Call route */
const route=require('./route');
app.use(express.json());
app.use(route);
const PORT=3000;
/*Connect to db using mongoose */
mongoose.connect('mongodb://localhost:27017/wpr-quiz', () => {
    console.log("Connected to db");
});

app.listen(3000,() =>{
    console.log("Connected to server");
})

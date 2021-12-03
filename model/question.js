const mongoose=require('mongoose');
const QuestionShema=new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    text:String,
    answers:[],
    correctAnswer:Number
});
module.exports=new mongoose.model('questions',QuestionShema);


const mongoose=require('mongoose');
/*create schema for attempt */
const AttemptSchema=new mongoose.Schema({
    /* type for id is objectId*/
    _id:mongoose.Types.ObjectId,
    questions:[],
    correctAnswers:{},
    answers:{},
    score:Number,
    scoreText:String,
    startedAt:Date,
    completed:Boolean
})
/*module.exports use when export only one function or variable */
/*create new model
    model for managing document in a collection 
*/
/*mongoose.model(collection name, schema ) */
module.exports=new mongoose.model('attempts',AttemptSchema);
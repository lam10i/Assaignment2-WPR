const mongoose=require('mongoose');
const Questions=require('../model/question.js');
const Attempts=require('../model/attempt.js');
exports.getQuestions= async (req,res) => {
    /*get 10 random document from model Questions */
    const questions=await Questions.aggregate([{ $sample: { size: 10 } }]);
    const newQuestions=[];
    /*push new object to newQuestion without correctAnswer */
   questions.forEach((question) => {
       newQuestions.push({
           _id:question._id,
           answers:question.answers,
           text:question.text
       })
    })
       /* 
       create object correctAnswers
       with key is question id
       */
     const correctAnswers={};
     questions.forEach((question) => {
         correctAnswers[question._id]=question.correctAnswer
     })
  /* create new document*/
    const attempt=new Attempts( {
        _id:new mongoose.Types.ObjectId,
        questions:newQuestions,
        correctAnswers,
        answers:{},
        score:0,
        scoreText:"",
        startedAt:new Date(),
        completed:false
    })
    const result={
        _id:attempt._id,
        questions:attempt.questions,
        startedAt:attempt.startedAt,
        completed:false
    }
    /**Save that document to db */
    await attempt.save();
    return res.status(201).json(result);

}


exports.submitQuiz= async(req,res) => {
    const id=req.params.id;
    const answers=req.body.answers;
    let score=0;
    let scoreText="";
    /*find the attempt by id from route params */
    let attempt=await Attempts.findById(id);
    /*use destructring to get properties from attempt */
    const {correctAnswers,completed}=attempt;
    /*if commpleted is true
      set status is 200 and return the attempt
      is already in db
      not compute score again
    */
    if(completed){
       return res.status(200).json(attempt)
    }
    /*
        Use Object.key to get all key from answers => array
        Use forEach to loop that array
        Compute score
    */
    Object.keys(answers).forEach( (key) => {
        if(Number(answers[key])===Number(correctAnswers[key])){
            score++;
        }
    })
    /*Compute scoreText depend on score */
if(score<5){
    scoreText="Practice more to improve"
}
else if(score<7){
    scoreText="Good,keep up"
}
else if(score<9){
    scoreText="Well done"
}
else {
    scoreText="Perfect"
}
/*Update some properties for attempt in db */
await attempt.updateOne({
    answers,
    score,
    scoreText,
    completed:true
})
attempt=await Attempts.findById(id);
  return res.status(200).json(attempt);
}


const express=require('express');
const Router=express.Router();
/* get function from controllers*/
const {getQuestions,submitQuiz}=require('../controllers')
Router.post('/attempts',getQuestions);
Router.post('/attempts/:id/submit',submitQuiz);

module.exports=Router;
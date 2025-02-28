// A layer of abstraction to wrap around the quiz question class. Will help keep quiz question entities decoupled from the rest of the application.
// Will interact with the quiz question entity by executing business logic methods and enforcing business rules.
import databaseService from "../../utils/databaseService.js";
import createQuizQuestion from "./quizQuestionFactory.js";

class quizQuestionService{
	constructor(quizQuestion){
		this.quizQuestion = quizQuestion;
	}
	
	// Retreives the quiz question's id.
	getId(){
		return this.quizQuestion.id;
	}
	
	// Retreives the quiz question's quiz id.
	getQuizId(){
		return this.quizQuestion.quizId;
	}
	
	// Retreives the quizQuestion question.
	getQuestion(){
		return this.quizQuestion.question;
	}
	
	// Retreives the quizQuestion answers.
	getAnswers(){
		return this.quizQuestion.answers;
	}
	
	// Getter method that ensures the quiz question is between 30 and 200 characters long.
	getValidateQuestion(){
		return this.quizQuestion.validateQuestion();
	}
	
	// Getter method that ensures the answers of the quiz question contain the fields A, B, C, and D.
	getValidateAnswers(){
		return this.quizQuestion.validateAnswers();
	}
	
	// Getter method that ensures the length of each answer of the quiz question are between 15 to 50 characters long.
	getValidateAnswersLength(){
		return this.quizQuestion.validateAnswersLength();
	}
	
	// Getter method that ensures the correct answer of the quiz question is either A, B, C, or D.
	getValidateCorrectAnswer(){
		return this.quizQuestion.validateCorrectAnswer();
	}
	
	// Async method that returns a quizQuestion that is also added to the database.
	async createQuizQuestion(quizId, question, answers, correctAnswer){
		return result = await createQuizQuestion(quizId, question, answers, correctAnswer);
	}
	
	// Async method that deletes a quizQuestion from the database associated with the given quizQuestionId.
	async deleteQuizQuestion(quizQuestionId){
		let dbWrapper = new databaseService();
		let result = await dbWrapper.deleteQuizQuestion(quizQuestionId);
		return result;
	}
	
	// Async method that retrieves all quizQuestions from the database associated to the given quizId.
	async getQuizQuestions(quizId){
		let dbWrapper = new databaseService();
		let result = await dbWrapper.getQuizQuestions(quizId);
		return result;
	}
}

export default quizQuestionService;
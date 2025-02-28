// A layer of abstraction to wrap around the quiz answer class. Will help keep quiz answer entities decoupled from the rest of the application.
// Will interact with the quiz answer entity by executing business logic methods and enforcing business rules.
import databaseService from "../../utils/databaseService.js";
import createQuizAnswer from "./quizAnswerFactory.js";

class quizAnswerService{
	constructor(quizAnswer){
		this.quizAnswer = quizAnswer;
	}
	
	// Retreives the quiz answer's id.
	getId(){
		return this.quizAnswer.id;
	}
	
	// Retreives the quiz answer's quiz attempt id.
	getQuizAttemptId(){
		return this.quizAnswer.quizAttemptId;
	}
	
	// Retreives the quiz answer's quiz question id.
	getQuizQuestionId(){
		return this.quizAnswer.quizQuestionId;
	}
	
	// Retreives the quiz answer's answer character.
	getAnswer(){
		return this.quizAnswer.answer;
	}
	
	// Getter method that ensures the quiz answer's id field is an integer.
	getValidateId(){
		return this.quizAnswer.validateId();
	}
	
	// Getter method that ensures the quiz answer's quiz attempt id field is an integer.
	getValidateQuizAttemptId(){
		return this.quizAnswer.validateQuizAttemptId();
	}
	
	// Getter method that ensures the quiz answer's quiz question id field is an integer.
	getValidateQuizQuestionId(){
		return this.quizAnswer.validateQuizQuestionId();
	}
	
	// Getter method that ensures the quiz answer's answer field is either A, B, C, or D.
	getValidateAnswer(){
		return this.quizAnswer.validateAnswer();
	}
	
	// Async method that returns a quizAnswer that is also added to the database.
	async createQuizAnswer(quizAttemptId, quizQuestionId, answer){
		return result = await createQuizAnswer(quizAttemptId, quizQuestionId, answer);
	}
	
	// Async method that deletes a quizAnswer from the database with the given quizAnswerId.
	async deleteQuizAnswer(quizAnswerId){
		let dbWrapper = new databaseService();
		let result = await dbWrapper.deleteQuizAnswer(quizAnswerId);
		return result;
	}
	
	// Async method that retrieves all quizAnswers from the database associated to the given quizAttemptId.
	async getQuizAnswers(quizAttemptId){
		let dbWrapper = new databaseService();
		let result = await dbWrapper.getQuizAnswers(quizAttemptId);
		return result;
	}
}

export default quizAnswerService;
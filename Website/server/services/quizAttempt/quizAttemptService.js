// A layer of abstraction to wrap around the quiz attempt class. Will help keep quiz attempt entities decoupled from the rest of the application.
// Will interact with the quiz attempt entity by executing business logic methods and enforcing business rules.
import databaseService from "../../utils/databaseService.js";
import createQuizAttempt from "./quizAttemptFactory.js";


class quizAttemptService{
	constructor(quizAttempt){
		this.quizAttempt = quizAttempt;
	}
	
	// Retreives the quiz attempt's id.
	getId(){
		return this.quizAttempt.id;
	}
	
	// Retreives the quiz attempt's user id.
	getUserId(){
		return this.quizAttempt.userId;
	}
	
	// Retreives the quiz attempt's quiz id.
	getQuizId(){
		return this.quizAttempt.quizId;
	}
	
	// Retreives the quiz attempt's isFinished boolean.
	getIsFinished(){
		return this.quizAttempt.isFinished;
	}
	
	// Getter method that ensures the quiz attempt's id field is an integer.
	getValidateId(){
		return this.quizAttempt.validateId();
	}
	
	// Getter method that ensures the quiz attempt's user id field is an integer.
	getValidateUserId(){
		return this.quizAttempt.validateUserId();
	}
	
	// Getter method that ensures the quiz attempt's quiz id field is an integer.
	getValidateQuizId(){
		return this.quizAttempt.validateQuizId();
	}
	
	// Getter method that ensures the quiz attempt's isFinished field is a boolean.
	getValidateIsFinished(){
		return this.quizAttempt.validateIsFinished();
	}
	
	// Setter method that sets the quiz attempt's isFinished boolean field based on the given value.
	setValidateIsFinished(isFinished){
		if(isFinished instanceof Boolean){
			this.quizAttempt.isFinished = isFinished;
		}
		else{
			throw new Error("Passed in value must be a boolean");
		}
	}
	
	// Async method that returns a quizAttempt that is also added to the database.
	async createQuizAttempt(userId, quizId, isFinished){
		return result = await createQuizAttempt(userId, quizId, isFinished);
	}
	
	// Async method that deletes a quizAttempt from the database associated with the given quizAttemptId.
	async deleteQuizAttempt(quizAttemptId){
		let dbWrapper = new databaseService();
		return result = await dbWrapper.deleteQuizAttempt(quizAttemptId);
	}
	
	// Async method that retrieves all quizAttempts from the database associated to the given userId.
	async getQuizAttempts(userId){
		let dbWrapper = new databaseService();
		return result = await dbWrapper.getQuizAttempts(userId);
	}
}

export default quizAttemptService;
// A layer of abstraction to wrap around the quiz class. Will help keep quiz entities decoupled from the rest of the application.
// Will interact with the quiz entity by executing business logic methods and enforcing business rules.
import databaseService from "../../utils/databaseService.js";
import createQuiz from "./quizFactory.js";

class quizService{
	constructor(quiz){
		this.quiz = quiz;
	}
	
	// Retreives the quiz's id.
	getId(){
		return this.quiz.id;
	}
	
	// Retreives the quiz's moduleId.
	getModuleId(){
		return this.quiz.moduleId;
	}
	
	// Retreives the quiz's title.
	getTitle(){
		return this.quiz.title;
	}
	
	// Retreives the quiz's body.
	getBody(){
		return this.quiz.body;
	}
	
	// Getter method that ensures the title of the quiz is between 1 and 30 characters long.
	getValidateTitle(){
		return this.quiz.validateTitle();
	}
	
	// Getter method that ensures the body of the quiz is between 0 and 5000 characters long.
	getValidateBody(){
		return this.quiz.validateBody();
	}
	
	// Async method that returns a quiz that is also added to the database.
	async createQuiz(moduleId, title, body){
		return result = await createQuiz(moduleId, title, body);
	}
	
	// Async method that deletes a quiz from the database with the given title.
	async deleteQuiz(title){
		let dbWrapper = new databaseService();
		let result = await dbWrapper.deleteQuiz(title);
		return result;
	}
	
	// Async method that retrieves all quizzes from the database associated to the given moduleId.
	async getQuizzes(moduleId){
		let dbWrapper = new databaseService();
		let result = await dbWrapper.getQuizzes(moduleId);
		return result;
	}
}

export default quizService;
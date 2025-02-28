// Will map quiz related HTTP requests to the appropriate services which contain the appropriate business logic to handle them.
import quizService from "../services/quiz/quizService.js";
import createQuiz from "../services/quiz/quizFactory.js";

class quizController{
	// Method that relays quiz creation requests to the approriate service.
	async createQuiz(req, res){
		// Obtain the quiz details from the request body
		const moduleId = req.body.moduleId;
		const title = req.body.title;
		const body = req.body.body;
		
		let quiz = await createQuiz(moduleId, title, body);
		
		// Reponses based on the attempt to create the proposed quiz.
		if(quiz.boolean){
			// Quiz creation successful.
			return res.status(201).json({
				boolean: true,
				response: quiz.response,
				quiz: quiz.quiz
			});
		}
		
		// Quiz creation failed due to an unforseen error.
		else if(quiz.response === "An unexpected error occurred."){
			return res.status(500).json({
				boolean: false,
				response: quiz.response
			});
		}
		else{
			// Quiz creation failed, the proposed quiz was invalid.
			return res.status(400).json({
				boolean: false,
				response: quiz.response
			});
		}
	}
	
	// Method that relays quiz deletion requests to the approriate service.
	async deleteQuiz(req, res){
		const quizTitle = req.query.title;
		let quizWrapper = new quizService();
		/* 
			Attempting to delete the proposed quiz from the database via the quizService deleteQuiz method
			which interacts with the database through the appropriate quizService method.
		*/
		let result = await quizWrapper.deleteQuiz(quizTitle);
		if(result.boolean){
			// Quiz creation successful.
			return res.status(201).json({
				boolean: true,
				response: result.response
			});
		}
		else{
			// Quiz creation failed.
			return res.status(400).json({
				boolean: false,
				response: result.response
			});
		}
		
	}
	
	// Method that relays quiz retrieval requests to the approriate service.
	async getQuizzes(req, res){
		const moduleId = req.query.moduleId;
		let quizWrapper = new quizService();
		/* 
			Attempting to retrieve the quizzes from the database via the quizService getQuizzes method
			which interacts with the database through the appropriate databaseService method.
		*/
		let result = await quizWrapper.getQuizzes(moduleId);
		if(result.boolean){
			// Quizze(s) retrieval successful.
			return res.status(201).json({
				boolean: true,
				response: result.response,
				quizzes: result.quizzes
			});
		}
		else{
			// Quizze(s) retrieval failed.
			return res.status(400).json({
				boolean: false,
				response: result.response
			});
		}
		
	}
}

export default quizController;
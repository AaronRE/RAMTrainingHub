// Will map quiz question related HTTP requests to the appropriate services which contain the appropriate business logic to handle them.
import quizQuestionService from "../services/quizQuestion/quizQuestionService.js";
import createQuizQuestion from "../services/quizQuestion/quizQuestionFactory.js";

class quizQuestionController{
	// Method that relays quiz question creation requests to the approriate service.
	async createQuizQuestion(req, res){
		// Obtain the quiz question details from the request body
		const quizId = req.body.quizId;
		const question = req.body.question;
		const answers = req.body.answers;
		const correctAnswer = req.body.correctAnswer;
		
		let quizQuestion = await createQuizQuestion(quizId, question, answers, correctAnswer);
		
		// Reponses based on the attempt to create the proposed quiz question.
		if(quizQuestion.boolean){
			// Quiz question creation successful.
			return res.status(201).json({
				boolean: true,
				response: quizQuestion.response,
				quizQuestion: quizQuestion.quizQuestion
			});
		}
		
		// Quiz question creation failed due to an unforseen error.
		else if(quizQuestion.response === "An unexpected error occurred."){
			return res.status(500).json({
				boolean: false,
				response: quizQuestion.response
			});
		}
		else{
			// Quiz question creation failed, the proposed quiz question was invalid.
			return res.status(400).json({
				boolean: false,
				response: quizQuestion.response
			});
		}
	}
	
	// Method that relays quiz question deletion requests to the approriate service.
	async deleteQuizQuestion(req, res){
		const quizQuestionId = req.query.id;
		let quizQuestionWrapper = new quizQuestionService();
		/* 
			Attempting to delete the proposed quiz question from the database via the quizQuestionService 
			deleteQuizQuestion method which interacts with the database through the appropriate quizQuestionService method.
		*/
		let result = await quizQuestionWrapper.deleteQuizQuestion(quizQuestionId);
		if(result.boolean){
			// Quiz question deletion successful.
			return res.status(201).json({
				boolean: true,
				response: result.response
			});
		}
		else{
			// Quiz question deletion failed.
			return res.status(400).json({
				boolean: false,
				response: result.response
			});
		}
		
	}
	
	// Method that relays quizQuestion retrieval requests to the approriate service.
	async getQuizQuestions(req, res){
		const quizId = req.query.quizId;
		let quizQuestionWrapper = new quizQuestionService();
		/* 
			Attempting to retrieve the quizQuestions from the database via the quizQuestionService getQuizQuestions method
			which interacts with the database through the appropriate databaseService method.
		*/
		let result = await quizQuestionWrapper.getQuizQuestions(quizId);
		if(result.boolean){
			// quizQuestion(s) retrieval successful.
			return res.status(201).json({
				boolean: true,
				response: result.response,
				quizQuestions: result.quizQuestions
			});
		}
		else{
			// quizQuestion(s) retrieval failed.
			return res.status(400).json({
				boolean: false,
				response: result.response
			});
		}
		
	}
}

export default quizQuestionController;
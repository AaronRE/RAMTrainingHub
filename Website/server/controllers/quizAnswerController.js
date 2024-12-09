// Will map quiz answer related HTTP requests to the appropriate services which contain the appropriate business logic to handle them.
import quizAnswerService from "../services/quizAnswer/quizAnswerService";
import createQuizAnswer from "../services/quizAnswer/quizAnswerFactory";

class quizAnswerController{
	// Method that relays quiz answer creation requests to the approriate service.
	async createQuizAnswer(req, res){
		// Obtain the quiz answer details from the request body.
		const quizAttemptId = req.body.quizAttemptId;
		const quizQuestionId = req.body.quizQuestionId;
		const answer = req.body.answer;
		
		let quizAnswer = await createQuizAnswer(quizAttemptId, quizQuestionId, answer);
		
		// Reponses based on the attempt to create the proposed quiz answer.
		if(quizAnswer.boolean){
			// Quiz answer creation successful.
			return res.status(201).json({
				boolean: true,
				response: quizAnswer.response,
				quizAnswer: quizAnswer.quizAnswer
			});
		}
		
		// Quiz answer creation failed due to an unforseen error.
		else if(quizAnswer.response === "An unexpected error occurred."){
			return res.status(500).json({
				boolean: false,
				response: quizAnswer.response
			});
		}
		else{
			// Quiz answer creation failed, the proposed quiz answer was invalid.
			return res.status(400).json({
				boolean: false,
				response: quizAnswer.response
			});
		}
	}
	
	// Method that relays quiz answer deletion requests to the approriate service.
	async deleteQuizAnswer(req, res){
		const quizAnswerId = req.body.id;
		let quizAnswerWrapper = new quizAnswerService();
		/* 
			Attempting to delete the proposed quiz answer from the database via the quizAnswerService 
			deleteQuizAnswer method which interacts with the database through the appropriate quizAnswerService method.
		*/
		let result = await quizAnswerWrapper.deleteQuizAnswer(quizAnswerId);
		if(result.boolean){
			// Quiz answer deletion successful.
			return res.status(201).json({
				boolean: true,
				response: result.response
			});
		}
		else{
			// Quiz answer deletion failed.
			return res.status(400).json({
				boolean: false,
				response: result.response
			});
		}
		
	}
	
	// Method that relays quizAnswer retrieval requests to the approriate service.
	async getQuizAnswers(req, res){
		const quizAttemptId = req.body.quizAttemptId;
		let quizAnswerWrapper = new quizAnswerService();
		/* 
			Attempting to retrieve the quizAnswer(s) from the database via the quizAnswerService getQuizAnswers method
			which interacts with the database through the appropriate databaseService method.
		*/
		let result = await quizAnswerWrapper.getQuizAnswers(quizAttemptId);
		if(result.boolean){
			// quizAnswer(s) retrieval successful.
			return res.status(201).json({
				boolean: true,
				response: result.response
			});
		}
		else{
			// quizAnswer(s) retrieval failed.
			return res.status(400).json({
				boolean: false,
				response: result.response
			});
		}
		
	}
}

export default quizAnswerController;
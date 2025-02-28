// Will map quiz attempt related HTTP requests to the appropriate services which contain the appropriate business logic to handle them.
import quizAttemptService from "../services/quizAttempt/quizAttemptService.js";
import createQuizAttempt from "../services/quizAttempt/quizAttemptFactory.js";

class quizAttemptController{
	// Method that relays quiz attempt creation requests to the approriate service.
	async createQuizAttempt(req, res){
		// Obtain the quiz attempt details from the request body
		const userId = req.body.userId;
		const quizId = req.body.quizId;
		const isFinished = req.body.isFinished;
		
		let quizAttempt = await createQuizAttempt(userId, quizId, isFinished);
		
		// Reponses based on the attempt to create the proposed quiz attempt.
		if(quizAttempt.boolean){
			// Quiz attempt creation successful.
			return res.status(201).json({
				boolean: true,
				response: quizAttempt.response,
				quizAttempt: quizAttempt.quizAttempt
			});
		}
		
		// Quiz attempt creation failed due to an unforseen error.
		else if(quizAttempt.response === "An unexpected error occurred."){
			return res.status(500).json({
				boolean: false,
				response: quizAttempt.response
			});
		}
		else{
			// Quiz attempt creation failed, the proposed quiz attempt was invalid.
			return res.status(400).json({
				boolean: false,
				response: quizAttempt.response
			});
		}
	}
	
	// Method that relays quiz attempt deletion requests to the approriate service.
	async deleteQuizAttempt(req, res){
		const quizAttemptId = req.body.id;
		let quizAttemptWrapper = new quizAttemptService();
		/* 
			Attempting to delete the proposed quiz attempt from the database via the quizAttemptService 
			deleteQuizAttempt method which interacts with the database through the appropriate quizAttemptService method.
		*/
		let result = await quizAttemptWrapper.deleteQuizAttempt(quizAttemptId);
		if(result.boolean){
			// Quiz attempt deletion successful.
			return res.status(201).json({
				boolean: true,
				response: result.response
			});
		}
		else{
			// Quiz attempt deletion failed.
			return res.status(400).json({
				boolean: false,
				response: result.response
			});
		}
		
	}
	
	// Method that relays quizAttempt retrieval requests to the approriate service.
	async getQuizAttempts(req, res){
		const userId = req.query.userId;
		let quizAttemptWrapper = new quizAttemptService();
		/* 
			Attempting to retrieve the quizAttempt(s) from the database via the quizAttemptService getQuizAttempts method
			which interacts with the database through the appropriate databaseService method.
		*/
		let result = await quizAttemptWrapper.getQuizAttempts(userId);
		if(result.boolean){
			// quizAttempt(s) retrieval successful.
			return res.status(201).json({
				boolean: true,
				quizAttempts: result.quizAttempts,
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

export default quizAttemptController;
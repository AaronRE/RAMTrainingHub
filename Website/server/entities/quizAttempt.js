// Represents the quiz attempt business object. Will encapsulate its related data, behavior, and rules.

 class quizAttempt{
	constructor(id, userId, quizId, isFinished, score){
		this.id = id;
		this.userId = userId;
		this.quizId = quizId;
		this.isFinished = isFinished;
		this.score = score;
	}
	
	// Method that ensures id is an integer.
	validateId(){
		return Number.isInteger(this.id);
	}
	
	// Method that ensures userId is an integer.
	validateUserId(){
		return Number.isInteger(this.userId);
	}
	
	// Method that ensures quizId is an integer.
	validateQuizId(){
		return Number.isInteger(this.quizId);
	}
	
	// Method that ensures isFinished is a boolean.
	validateIsFinished(){
		return typeof this.isFinished === "boolean";
	}
	
	// Method that ensures score is an integer.
	validateScore(){
		return Number.isInteger(this.score);
	}
}

export default quizAttempt;
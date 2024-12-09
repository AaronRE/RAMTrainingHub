// Represents the quiz answer business object. Will encapsulate its related data, behavior, and rules.

 class quizAnswer{
	constructor(id, quizAttemptId, quizQuestionId, answer){
		this.id = id;
		this.quizAttemptId = quizAttemptId;
		this.quizQuestionId = quizQuestionId;
		this.answer = answer;
	}
	
	// Method that ensures id is an integer.
	validateId(){
		return Number.isInteger(this.id);
	}
	
	// Method that ensures quizAttemptId is an integer.
	validateQuizAttemptId(){
		return Number.isInteger(this.quizAttemptId);
	}
	
	// Method that ensures quizQuestionId is an integer.
	validateQuizQuestionId(){
		return Number.isInteger(this.quizQuestionId);
	}
	
	// Method that ensures answer only contains A, B, C, or D.
	validateAnswer(){
		return 'A' === this.answer || 'B' === this.answer || 'C' === this.answer || 'D' === this.answer;
	}
}

export default quizAnswer;
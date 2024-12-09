// Represents the quiz question business object. Will encapsulate its related data, behavior, and rules.

 class quizQuestion{
	constructor(id, quizId, question, answers, correctAnswer){
		this.id = id;
		this.quizId = quizId;
		this.question = question;
		this.answers = answers;
		this.correctAnswer = correctAnswer;
	}
	
	// Method that ensures the quiz question is between 30 and 200 characters long.
	validateQuestion(){
		return this.question.length > 29 && this.question.length <= 200;
	}
	
	// Method that ensures the answers of the quiz question contain the fields A, B, C, and D.
	validateAnswers(){
		if(typeof this.answers !== 'object' || this.answers === null){
			return false;
		}
		return 'A' in this.answers && 'B' in this.answers && 'C' in this.answers && 'D' in this.answers;
	}
	
	// Method that ensures the length of each answer of the quiz question are between 15 to 50 characters long.
	validateAnswersLength(){
		return this.answers.A.length > 14 && this.answers.A.length <= 50 && this.answers.B.length > 14 && this.answers.B.length <= 50 &&
			   this.answers.C.length > 14 && this.answers.C.length <= 50 && this.answers.D.length > 14 && this.answers.D.length <= 50;
	}
	
	// Method that ensures the correct answer of the quiz question is either A, B, C, or D.
	validateCorrectAnswer(){
		return this.correctAnswer === 'A' || this.correctAnswer === 'B' || this.correctAnswer === 'C' || this.correctAnswer === 'D';
	}
}

export default quizQuestion;
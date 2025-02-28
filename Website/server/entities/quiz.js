// Represents the quiz business object. Will encapsulate its related data, behavior, and rules.

 class Quiz{
	constructor(id, moduleId, title, body){
		this.id = id;
		this.moduleId = moduleId;
		this.title = title;
		this.body = body;
	}
	
	// Method that ensures the quiz title is between 1 and 30 characters long.
	validateTitle(){
		return this.title.length > 0 && this.title.length <= 30;
	}
	
	// Method that ensures the body of the quiz is between 0 and 50 characters long.
	validateBody(){
		return this.body.length >= 0 && this.body.length <= 50;
	}
}

export default Quiz;
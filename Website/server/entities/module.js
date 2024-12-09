// Represents the module business object. Will encapsulate its related data, behavior, and rules.

 class Module{
	constructor(id, title, body){
		this.id = id;
		this.title = title;
		this.body = body;
	}
	
	// Method that ensures the title of the module is between 1 and 50 characters long.
	validateTitle(){
		return this.title.length > 0 && this.title.length <= 50;
	}
	
	// Method that ensures the body of the module is between 0 and 1000 characters long.
	validateBody(){
		return this.body.length >= 0 && this.body.length <= 1000;
	}
}

export default Module;
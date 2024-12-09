// Represents the document business object. Will encapsulate its related data, behavior, and rules.

 class Document{
	constructor(id, moduleId, title, body, author, email, type){
		this.id = id;
		this.moduleId = moduleId;
		this.title = title;
		this.body = body;
		this.author = author;
		this.email = email;
		this.type = type;
	}
	
	// Method that ensures that moduleId is either null or an integer.
	validateModuleId(){
		return this.moduleId === null || Number.isInteger(this.moduleId);
	}
	
	// Method that ensures the title of the document is between 1 and 50 characters long.
	validateTitle(){
		return this.title.length > 0 && this.title.length <= 50;
	}
	
	// Method that ensures the body of the document is between 0 and 5000 characters long.
	validateBody(){
		return this.body.length >= 0 && this.body.length <= 5000;
	}
	
	// Method that ensures that the provided email is a valid publix email.
	validateEmail(){
		let emailRegex = /^[^\s@]+@publix\.com$/;
		return emailRegex.test(this.email);
	}
	
	// Method that ensures the type of the document is either Manual or Procedure.
	validateType(){
		return this.type === "Manual" || this.type === "Procedure";
	}
	
}

export default Document;
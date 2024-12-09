// A layer of abstraction to wrap around the document class. Will help keep document entities decoupled from the rest of the application.
// Will interact with the document entity by executing business logic methods and enforcing business rules.
import databaseService from "../../utils/databaseService.js";
import createDocument from "./documentFactory.js";

class documentService{
	constructor(document){
		this.document = document;
	}
	
	// Retreives the document's moduleId.
	getModuleId(){
		return this.document.moduleId;
	}
	
	// Retreives the document's title.
	getTitle(){
		return this.document.title;
	}
	
	// Retreives the document's body.
	getBody(){
		return this.document.body;
	}
	
	// Retreives the document's author.
	getAuthor(){
		return this.document.author;
	}
	
	// Retreives the document's email.
	getEmail(){
		return this.document.email;
	}
	
	// Retreives the document's type.
	getType(){
		return this.document.type;
	}
	
	// Getter method that ensures the moduleId associated to the document is either null or an integer.
	getValidateModuleId(){
		return this.document.validateModuleId();
	}
	
	// Getter method that ensures the title of the document is between 1 and 50 characters long.
	getValidateTitle(){
		return this.document.validateTitle();
	}
	
	// Getter method that ensures the body of the document is between 0 and 5000 characters long.
	getValidateBody(){
		return this.document.validateBody();
	}
	
	// Getter method that ensures the email of who created the document is a publix email.
	getValidateEmail(){
		return this.document.validateEmail();
	}
	
	// Getter method that ensures the type of the document is either Manual or Procedure.
	getValidateType(){
		return this.document.validateType();
	}
	
	// Async method that returns a document that is also added to the database.
	async createDocument(moduleId, title, body, author, email, type){
		return result = await createDocument(moduleId, title, body, author, email, type);
	}
	
	// Async method that deletes a document from the database with the given title.
	async deleteDocument(title){
		let dbWrapper = new databaseService();
		return result = await dbWrapper.deleteDocument(title);
	}
	
	// Async method that retrieves all documents from the database.
	async getDocuments(){
		let dbWrapper = new databaseService();
		return result = await dbWrapper.getDocuments();
	}
	
	// Async method that retrieves all documents from the database associated to the given moduleId.
	async getModuleDocuments(moduleId){
		let dbWrapper = new databaseService();
		return result = await dbWrapper.getModuleDocuments(moduleId);
	}
	
	
}

export default documentService;
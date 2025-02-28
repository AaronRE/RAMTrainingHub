// A layer of abstraction to wrap around the module class. Will help keep module entities decoupled from the rest of the application.
// Will interact with the module entity by executing business logic methods and enforcing business rules.
import databaseService from "../../utils/databaseService.js";
import createModule from "./moduleFactory.js";

class moduleService{
	constructor(module){
		this.module = module;
	}
	
	// Retreives the module's id.
	getId(){
		return this.module.id;
	}
	
	// Retreives the module's title.
	getTitle(){
		return this.module.title;
	}
	
	// Retreives the module's body.
	getBody(){
		return this.module.body;
	}
	
	// Getter method that ensures the title of the module is between 1 and 50 characters long.
	getValidateTitle(){
		return this.module.validateTitle();
	}
	
	// Getter method that ensures the body of the module is between 0 and 1000 characters long.
	getValidateBody(){
		return this.module.validateBody();
	}
	
	// Async method that returns a module that is also added to the database.
	async createModule(title, body){
		let result = await createModule(title, body);
		return result;
	}
	
	// Async method that deletes a module from the database with the given title.
	async deleteModule(title){
		let dbWrapper = new databaseService();
		let result = await dbWrapper.deleteModule(title);
		return result;
	}
	
	// Async method that retrieves all modules from the database.
	async getModules(){
		let dbWrapper = new databaseService();
		let result = await dbWrapper.getModules();
		return result;
	}
	
	// Async method that retrieves all documents from the database associated to the given moduleId.
	async getModuleDocuments(moduleId){
		let dbWrapper = new databaseService();
		let result = await dbWrapper.getModuleDocuments(moduleId);
		return result;
	}
	
}

export default moduleService;
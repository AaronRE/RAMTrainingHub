// Will map module related HTTP requests to the appropriate services which contain the appropriate business logic to handle them.
import moduleService from "../services/module/moduleService";
import createModule from "../services/module/moduleFactory";

class ModuleController{
	// Method that relays module creation requests to the approriate service.
	async createModule(req, res){
		// Obtain the module details from the request body
		const title = req.body.title;
		const body = req.body.body;
		
		let module = await createModule(title, body);
		
		// Reponses based on the attempt to create the proposed module.
		if(module.boolean){
			// Module creation successful.
			return res.status(201).json({
				boolean: true,
				response: module.response,
				module: module.module
			});
		}
		
		// Module creation failed due to an unforseen error.
		else if(module.response === "An unexpected error occurred."){
			return res.status(500).json({
				boolean: false,
				response: module.response
			});
		}
		else{
			// Module creation failed, the proposed module was invalid.
			return res.status(400).json({
				boolean: false,
				response: module.response
			});
		}
	}
	
	// Method that relays module deletion requests to the approriate service.
	async deleteModule(req, res){
		const moduleTitle = req.body.title;
		let moduleWrapper = new moduleService();
		/* 
			Attempting to delete the proposed module from the database via the moduleService deleteModule method
			which interacts with the database through the appropriate moduleService method.
		*/
		let result = await moduleWrapper.deleteModule(moduleTitle);
		if(result.boolean){
			// Module creation successful.
			return res.status(201).json({
				boolean: true,
				response: module.response
			});
		}
		else{
			// Module creation failed.
			return res.status(400).json({
				boolean: false,
				response: module.response
			});
		}
		
	}
}

export default ModuleController;
// Will map document related HTTP requests to the appropriate services which contain the appropriate business logic to handle them.
import documentService from "../services/document/documentService";
import createDocument from "../services/document/documentFactory";

class documentController{
	// Method that relays document creation requests to the approriate service.
	async createDocument(req, res){
		// Obtain the document details from the request body
		const title = req.body.title;
		const body = req.body.body;
		const author = req.body.author;
		const email = req.body.email;
		const type = req.body.type;
		
		let document = await createDocument(title, body, author, email, type);
		
		// Reponses based on the attempt to create the proposed document.
		if(document.boolean){
			// Document creation successful.
			return res.status(201).json({
				boolean: true,
				response: document.response,
				document: document.document
			});
		}
		
		// Document creation failed due to an unforseen error.
		else if(document.response === "An unexpected error occurred."){
			return res.status(500).json({
				boolean: false,
				response: document.response
			});
		}
		else{
			// Document creation failed, the proposed document was invalid.
			return res.status(400).json({
				boolean: false,
				response: document.response
			});
		}
	}
	
	// Method that relays document deletion requests to the approriate service.
	async deleteDocument(req, res){
		const documentTitle = req.body.title;
		let documentWrapper = new documentService();
		/* 
			Attempting to delete the proposed document from the database via the documentService deleteDocument method
			which interacts with the database through the appropriate databaseService method.
		*/
		let result = await documentWrapper.deleteDocument(documentTitle);
		if(result.boolean){
			// Document creation successful.
			return res.status(201).json({
				boolean: true,
				response: result.response
			});
		}
		else{
			// Document creation failed.
			return res.status(400).json({
				boolean: false,
				response: result.response
			});
		}
		
	}
	
	// Method that relays document retrieval requests to the approriate service.
	async getDocuments(req, res){
		let documentWrapper = new documentService();
		/* 
			Attempting to retrieve all the documents from the database via the documentService getDocuments method
			which interacts with the database through the appropriate databaseService method.
		*/
		let result = await documentWrapper.getDocuments();
		if(result.boolean){
			// Document(s) retrieval successful.
			return res.status(201).json({
				boolean: true,
				response: result.response
			});
		}
		else{
			// Document(s) retrieval failed.
			return res.status(400).json({
				boolean: false,
				response: result.response
			});
		}
		
	}
	
	// Method that relays document retrieval requests to the approriate service.
	async getModuleDocuments(req, res){
		const moduleId = req.body.moduleId;
		let documentWrapper = new documentService();
		/* 
			Attempting to retrieve the documents associated to the given moduleId from the database via the documentService 
			getModuleDocuments method which interacts with the database through the appropriate databaseService method.
		*/
		let result = await documentWrapper.getModuleDocuments(moduleId);
		if(result.boolean){
			// Module associated document(s) retrieval successful.
			return res.status(201).json({
				boolean: true,
				response: result.response
			});
		}
		else{
			// Module associated document(s) retrieval failed.
			return res.status(400).json({
				boolean: false,
				response: result.response
			});
		}
		
	}
}

export default documentController;
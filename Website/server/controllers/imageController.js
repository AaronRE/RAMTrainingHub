// Will map image related HTTP requests to the appropriate services which contain the appropriate business logic to handle them.
import imageService from "../services/image/imageService";
import createImage from "../services/image/imageFactory";

class ImageController{
	// Method that relays image creation requests to the approriate service.
	async createImage(req, res){
		// Obtain the image details from the request body
		const documentId = req.body.documentId;
		const imageName = req.body.imageName;
		const imageLink = req.body.imageLink;
		
		let image = await createImage(documentId, imageName, imageLink);
		
		// Reponses based on the attempt to create the proposed image.
		if(image.boolean){
			// Image creation successful.
			return res.status(201).json({
				boolean: true,
				response: image.response,
				image: image.image
			});
		}
		
		// Image creation failed due to an unforseen error.
		else if(image.response === "An unexpected error occurred."){
			return res.status(500).json({
				boolean: false,
				response: image.response
			});
		}
		else{
			// User creation failed, the proposed user was invalid.
			return res.status(400).json({
				boolean: false,
				response: image.response
			});
		}
	}
	
	// Method that relays image deletion requests to the approriate service.
	async deleteImage(req, res){
		const imageName = req.body.imageName;
		let imageWrapper = new imageService();
		/* 
			Attempting to delete the proposed image from the database via the imageService deleteUser method
			which interacts with the database through the appropriately databaseService method.
		*/
		let result = await imageWrapper.deleteImage(imageName);
		if(result.boolean){
			// Image creation successful.
			return res.status(201).json({
				boolean: true,
				response: result.response
			});
		}
		else{
			// Image creation failed.
			return res.status(400).json({
				boolean: false,
				response: result.response
			});
		}
		
	}
}

export default ImageController;
// A layer of abstraction to wrap around the document class. Will help keep document entities decoupled from the rest of the application.
// Will interact with the document entity by executing business logic methods and enforcing business rules.
import databaseService from "../../utils/databaseService.js";
import createImage from "./imageFactory.js";

class imageService{
	constructor(image){
		this.image = image;
	}
	
	// Retreives the image's name.
	getImageName(){
		return this.image.imageName;
	}
	
	// Retreives the image's link.
	getImageLink(){
		return this.image.imageLink;
	}
	
	// Getter method that ensures the name of the image is between 1 and 50 characters long.
	getValidateImageName(){
		return this.image.validateImageName();
	}
	
	// Getter method that ensures the link of the image is a google image link.
	getValidateLink(){
		return this.image.validateImageLink();
	}
	
	async deleteImage(imageName){
		let dbWrapper = new databaseService();
		return result = await dbWrapper.deleteImage(imageName);
	}
}

export default imageService;
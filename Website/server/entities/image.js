// Represents the image business object. Will encapsulate its related data, behavior, and rules.

 class Image{
	constructor(id, documentId, imageName, imageLink){
		this.id = id;
		this.documentId = documentId;
		this.imageName = imageName;
		this.imageLink = imageLink;
	}
	
	// Method that ensures the name of the image is between 1 and 50 characters long.
	validateImageName(){
		return this.imageName.length > 0 && this.imageName.length <= 50;
	}
	
	// Method that ensures the link of the image is a google image link.
	// Will fully implement later.
	validateImageLink(){
	 	let regex = /^(http|https):///;
	 	return regex.test(this.imageLink);
	}
}

export default Image;
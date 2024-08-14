// Represents the document business object. Will encapsulate its related data, behavior, and rules.

 class Document{
	constructor(id, title, body, author, email, type){
		this.id = id;
		this.title = title;
		this.body = body;
		this.author = author;
		this.email = email;
		this.type = type;
	}
	
}
	
export default Document;

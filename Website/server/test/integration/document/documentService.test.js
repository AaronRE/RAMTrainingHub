import databaseService from "../../../utils/databaseService.js";
import createDocument from "../../../services/document/documentFactory.js";
import documentService from "../../../services/document/documentService.js";
import {expect} from "chai";

describe("Document Entity", ()=>{
	let doc;
	let dbWrapper;
	let documentWrapper;
	
	beforeEach(async ()=>{
		dbWrapper = new databaseService();
		await dbWrapper.deleteAllDocuments();
		
		// Used the document factory to instantiate a new document.
		doc = await createDocument("UltraSite Manual", "This is a test", "test", "test123@gmail.com", "Manual");
		if(doc.boolean === false){
			throw new Error(document.response);
		}
		doc = doc.document;
		// Dependency injection. I've made this test file dependent on the documentWrapper for interacting with the document object's methods.
		documentWrapper = new documentService(doc);
	});
	
	afterEach(async()=>{
		dbWrapper.deleteAllDocuments();
	});
	
	it("should have a title field", ()=>{
		expect(documentWrapper.getTitle()).to.equal("UltraSite Manual");
	});
	
	it("should have a body field", ()=>{
		expect(documentWrapper.getBody()).to.equal("This is a test");
	});
	
	it("should have an author field", ()=>{
		expect(documentWrapper.getAuthor()).to.equal("test");
	});
	
	it("should have an email field", ()=>{
		expect(documentWrapper.getEmail()).to.equal("test123@gmail.com");
	});
	
	it("should have a type field", ()=>{
		expect(documentWrapper.getType()).to.equal("Manual");
	});
	
	it("should have a title between 1 and 50 characters long", ()=>{
		expect(documentWrapper.getValidateTitle()).to.be.true;
	});
	
	it("should have a body between 0 and 5000 characters long", ()=>{
		expect(documentWrapper.getValidateBody()).to.be.true;
	});
	
	it("should have a type that is either manual or procedure", ()=>{
		expect(documentWrapper.getValidateType()).to.be.true;
	});
});



	
	
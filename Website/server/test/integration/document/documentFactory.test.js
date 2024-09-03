import databaseService from "../../../utils/databaseService.js";
import createDocument from "../../../services/document/documentFactory.js";
import {expect} from "chai";

let dbWrapper;
let res;

describe("Document Factory",()=>{
	
	beforeEach(async()=>{
		dbWrapper = new databaseService();
		await dbWrapper.deleteAllDocuments();
	});
	
	afterEach(async ()=>{
		
	});
	
	it("should successfully create a document", async()=>{
		res = await createDocument("UltraSite Manual", "This is a test", "test", "test123@gmail.com", "Manual");
		expect(res.boolean).to.be.true;
	});
	
	it("should handle attempting to create a document that already exsists", async()=>{
		res = await createDocument("UltraSite Manual", "This is a test", "test", "test123@gmail.com", "Manual");
		expect(res.boolean).to.be.true;
		
		res = await createDocument("UltraSite Manual", "This is a test", "test", "test123@gmail.com", "Manual");
		expect(res.boolean).to.be.false;
	});
	
	it("it should handle when the title isn't entered", async() =>{
		res = await createDocument("", "This is a test", "test", "test123@gmail.com", "Manual");
		expect(res.boolean).to.be.false;
	});
	
	it("it should handle when the body is too long", async() =>{
		res = await createDocument("t".repeat(5001), "This is a test", "test", "test123@gmail.com", "Manual");
		expect(res.boolean).to.be.false;
	});
	
	it("it should handle when the type isn't Manual or Procedure", async() =>{
		res = await createDocument("UltraSite Manual", "This is a test", "test", "test123@gmail.com", "test");
		expect(res.boolean).to.be.false;
	});
});
	
	
import databaseService from "../../../utils/databaseService.js";
import {expect} from "chai";

describe("Database connection and methods", ()=>{
	let res;
	let dbWrapper;
	let connection;
	beforeEach(async()=>{
		dbWrapper = new databaseService();
	});
	
	afterEach(async()=>{
		
	});
	
	it("should successfully connect to the database", async()=>{
		await dbWrapper.getInitConnection();
		try{
			connection = dbWrapper.getConnection();
			expect(connection).to.be.an("object");
		}
		catch(error){
			throw error;
		}
		finally{
			await dbWrapper.getEndConnection();
		}		
	});
	
	//User related tests
	describe("User Methods", ()=>{
		it("should return true if the user already exists", async ()=>{
			try{
				res = await dbWrapper.checkIfUserExistsByUserName("tester123416");
				expect(res).to.be.true;
			}
			catch(error){
				throw error;
			}
		});
		
		it("it should delete an existing user", async()=>{
			try{
				res = await dbWrapper.deleteUser("tester123416");
				expect(res.boolean).to.equal(true);
			}
			catch(error){
				throw error;
			}
		});
		
		it("should return true if there isn't a duplicate username\"", async()=>{
			try{
				res = await dbWrapper.addUser("test", "test", "tester123416", "test123", "test@gmail.com");
				expect(res.boolean).to.equal(true);
			}
			catch(error){
				throw error;
			}
		});
	});
	
	// Document related tests
	describe("Document methods", ()=>{
		it("it should delete an existing document", async()=>{
			try{
				res = await dbWrapper.deleteDocument("test");
				expect(res.boolean).to.equal(true);
			}
			catch(error){
				throw error;
			}
		});
		
		it("should return true if all documents are successfully deleted", async()=>{
			try{
				res = await dbWrapper.deleteAllDocuments();
				expect(res.boolean).to.equal(true);
				}
			catch(error){
				throw error;
			}
		});
		
		it("should return true if there isn't a duplicate document", async()=>{
			try{
				res = await dbWrapper.addDocument("test", "test", "tester123416", "test123", "manual");
				expect(res.boolean).to.equal(true);
				}
			catch(error){
				console.log(res.response);
				throw error;
			}
		});
	});
	
	// Image related tests
	describe("Image methods", ()=>{
		let doc;
		beforeEach(async()=>{
		doc = await dbWrapper.addDocument("test", "test", "tester123416", "test123", "manual");
		});
		
		it("it should delete an existing image", async()=>{
			try{
				res = await dbWrapper.deleteImage("test");
				expect(res.boolean).to.equal(true);
			}
			catch(error){
				throw error;
			}
		});
		
		it("should return true if all images are successfully deleted", async()=>{
			try{
				res = await dbWrapper.deleteAllImages();
				expect(res.boolean).to.equal(true);
			}
			catch(error){
				throw error;
			}
		});
		
		it("should return true if there isn't a duplicate image", async()=>{
			try{
				res = await dbWrapper.addImage(doc.documentId, "test", "https://google.com");
				expect(res.boolean).to.equal(true);
				}
			catch(error){
				console.log(res.response);
				throw error;
			}
		});
		
		it("should return all of the images associated to an existing document", async()=>{
			try{
				res = await dbWrapper.getImages(doc.documentId);
				expect(res.boolean).to.equal(true);
				}
			catch(error){
				console.log(res.response);
				throw error;
			}
		});
	});
	
	// Module related tests
	describe("Module methods", ()=>{	
		
		it("it should delete an existing module", async()=>{
			try{
				res = await dbWrapper.deleteModule("Rack Down");
				expect(res.boolean).to.equal(true);
			}
			catch(error){
				throw error;
			}
		});
		
		it("should return true if all modules are successfully deleted", async()=>{
			try{
				res = await dbWrapper.deleteAllModules();
				expect(res.boolean).to.equal(true);
			}
			catch(error){
				throw error;
			}
		});
		
		it("should return true if there isn't a duplicate module", async()=>{
			try{
				res = await dbWrapper.addModule("Rack Down", "This is a test");
				expect(res.boolean).to.equal(true);
				}
			catch(error){
				console.log(res.response);
				throw error;
			}
		});
		
		it("should return false if there is a duplicate module", async()=>{
			try{
				res = await dbWrapper.addModule("Rack Down", "This is a test");
				expect(res.boolean).to.equal(false);
				}
			catch(error){
				console.log(res.response);
				throw error;
			}
		});
		
		it("should return all of the modules from the database", async()=>{
			try{
				res = await dbWrapper.getModules();
				expect(res.boolean).to.equal(true);
				}
			catch(error){
				console.log(res.response);
				throw error;
			}
		});
	});
});
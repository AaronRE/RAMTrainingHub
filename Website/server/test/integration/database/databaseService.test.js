import databaseService from "../../../utils/databaseService.js";
import {expect} from "chai";

describe("Database connection and methods", ()=>{
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
			let res;
			try{
				res = await dbWrapper.checkIfUserExistsByUserName("tester123416");
				expect(res).to.be.true;
			}
			catch(error){
				throw error;
			}
		});
		
		it("it should delete an existing user", async()=>{
			let res;
			try{
				res = await dbWrapper.deleteUser("tester123416");
				expect(res.boolean).to.equal(true);
			}
			catch(error){
				throw error;
			}
		});
		
		it("should return true if there isn't a duplicate username\"", async()=>{
			let res;
			try{
				res = await dbWrapper.addUser("test", "test", "tester123416", "test123", "test@gmail.com");
				expect(res.boolean).to.equal(true);
			}
			catch(error){
				throw error;
			}
		});
	});
	
	//Document related tests
	describe("Document methods", ()=>{
		it("it should delete an existing document", async()=>{
			let res;
			try{
				res = await dbWrapper.deleteDocument("test");
				expect(res.boolean).to.equal(true);
			}
			catch(error){
				throw error;
			}
		});
		
		it("should return true if there isn't a duplicate document", async()=>{
			let res;
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
});
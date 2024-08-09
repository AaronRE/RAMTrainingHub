import {expect} from "chai";
import mysql from "mysql2";
import database from "../../../utils/database.js";
import databaseService from "../../../utils/databaseService.js";

describe("Database connection and methods", ()=>{
	
	let db;
	let dbWrapper;
	let connection;
	let testConfig ={
		host: "127.0.0.1",
		user: "root",
		password: "585882552",
		database: "ramtraininghub"
	};
	beforeEach(async()=>{
		db = new database(testConfig);
		dbWrapper = new databaseService(db);
		await dbWrapper.getInitConnection();
	});
	
	afterEach(async()=>{
		await dbWrapper.getEndConnection();
	});
	
	it("should have successfully connected",()=>{
		try{
			connection = dbWrapper.getConnection();
		}
		catch(error){
			throw error;
		}		
	});
	
	it("should return true if the user already exists", async ()=>{
		try{
			let temp = await dbWrapper.checkIfUserExistsById(2);
			expect(temp).to.be.true;
		}
		catch(error){
			throw error;
		}
	});
	
	it("should return \"User added successfully if there isn't a duplicate username\"", async()=>{
		try{
			let res = await dbWrapper.addUser("test", "test", "tester123", "test123", "test@gmail.com");
			expect(res.response).to.equal("User added successfully!");
		}
		catch(error){
			throw error;
		}
	});
	
	
});
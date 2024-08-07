import {expect} from "chai";
import mysql from "mysql2";

describe("Database connection and methods", ()=>{
	
	let connection; 
	
	beforeEach((done)=>{
		connection = mysql.createConnection({
			host: "127.0.0.1",
			user: "root",
			password: "585882552",
		});
		connection.connect((error)=>{
			if(error){
				done(error);
			}
			else{
				done();
			}
		});
	});
	
	afterEach((done)=>{
		if(connection){
			connection.end((error)=>{
				if(error){
					done(error);
				}
				else{
					done();
				}
			});
		}
		else{
			done();
		}
	});
	
	it("Should have successfully connected",(done)=>{
		connection.ping((error)=>{
			if(error){
				done(error);
			}
			else{
				expect(1).to.equal(1);
				done();
			}
		});
	
	});
	
	
});
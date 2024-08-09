// Will serve as a central place to manage the connection with the database.
import mysql from "mysql2/promise";

class database{
	constructor(connectionConfig){
	this.connectionConfig = connectionConfig;
	this.connection = null;
	}

	async initConnection(){
		try{
			this.connection = await mysql.createConnection(this.connectionConfig);
			await this.connection.ping();
		}
		catch(error){
			throw error;
		}
	}

	async endConnection(){
		if(this.connection){
			try{
				await this.connection.end();
			}
			catch(error){
				console.log("Couldn't terminate the database connection");
				throw error;
			}
		}
	}
	getConnection(){
		if(this.connection){
			return this.connection;
		}
		else{
			throw new Error("Database connection needs to be made first.");
		}
	}
}

export default database;




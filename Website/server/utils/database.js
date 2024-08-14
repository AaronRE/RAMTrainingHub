// Will serve as a central place to manage the connection with the database.
import mysql from "mysql2/promise";

class database{
	// Constructor that will allow us to instantiate a database object with a given configuration and connection field.
	constructor(connectionConfig){
	this.connectionConfig = connectionConfig;
	this.connection = null;
	}
	
	// Method that makes a new connection to the database.
	async initConnection(){
		try{
			// Create a new connection given the passed in configuration.
			this.connection = await mysql.createConnection(this.connectionConfig);
			// Testing the connection through a ping signal.
			await this.connection.ping();
		}
		catch(error){
			// If the connection fails, throw an error.
			throw error;
		}
	}
	
	// Method that terminates the connection to the database.
	async endConnection(){
		if(this.connection){
			try{
				// Closes the connection if it exists.
				await this.connection.end();
			}
			catch(error){
				// If we can't terminate the connection, throw an error.
				throw error;
			}
		}
	}
	// Getter method to retrieve the current database connection
	getConnection(){
		if(this.connection){
			// Returns the current connection if it exists.
			return this.connection;
		}
		else{
			// Throws an error if there isn't a connection.
			throw new Error("Database connection needs to be made first.");
		}
	}
}

export default database;




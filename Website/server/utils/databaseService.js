// A layer of abstraction to wrap around the database class. Will help keep the database code decoupled from the rest of the application.
// Will allow us to interact with the database class indirectly, making it more easily extendable and maintainable.
import database from "./database.js";
import dbConfig from "./databaseConfiguration.js";

class databaseService{
	/* 
		Constructor that will allow us to instantiate a database service object with an instantiated 
		database object field based on the given configuration.
	*/
	constructor(){
		this.database = new database(dbConfig);
	}
	
	// Method to make a connection with the database.
	async getInitConnection(){
		try{
			// Initalize the connection.
			await this.database.initConnection();
		}
		catch(error){
			throw error;
		}	
	}	
	
	// Method that terminates the current connection to the database.
	async getEndConnection(){
		try{
			await this.database.endConnection();
		}
		catch(error){
			throw error;
		}	
	}
	
	// Getter method to retrieve the current connection to the database.
	getConnection(){
		return this.database.getConnection();
	}
	
	/* 
		Callback method that will wrap around database operation methods to ensure that a connection to the database
		is made before their execution and closed afterwards.
	*/
	async connectionHandler(callback){
		try{
			await this.getInitConnection();
			const connection = this.getConnection();
			// Once the connection is retrieved, pass it into the passed in database operation function.
			const res = await callback(connection);
			return res;
		}
		catch(error){
			throw error;
		}
		finally{
			await this.database.endConnection();
		}
	}
	
	// Method that queries the database to see if the given user exists in it.
	async checkIfUserExistsByUserName(username){
		return await this.connectionHandler(async (connection)=>{
			try{
				let [res] = await connection.query("SELECT * FROM users WHERE userName = ?", [username]);
				if(res[0].userName === username){
					return true;
				}
				else{
					return false;
				}
			}
			catch(error){
				throw error;
			}
		});
	}
	
	// Method that adds a new user to the database.
	async addUser(firstName, lastName, username, password, email){
		return await this.connectionHandler(async (connection)=>{
			try{
				const [res] = await connection.query(
				"INSERT INTO users (firstName, lastName, userName, user_password, email) VALUES (?, ?, ?, ?, ?)",
				[firstName, lastName, username, password, email]
				);
				const userId = res.id;
				return{
					id: userId,
					boolean: true,
					response: "User added successfully!"
				};
			}
			catch(error){
				// Duplication code returned indicating that the given username already exists in the database.
				if(error.errno === 1062){
					return{
						boolean: false,
						response: "That Username already exists."
					};
				}
				else{
					return{
						boolean: false,
						response: "Error, user couldn't be created."
					};
				}
			}
		});
	}
	
	// Method that finds a user by their given username and deletes it from the database.
	async deleteUser(userName){
		return await this.connectionHandler(async (connection)=>{
			try{
				await connection.query(
					"DELETE FROM users WHERE userName = ?",
					[userName]
				);
				return{
					boolean: true,
					response : "User deleted successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, user couldn't be deleted."
				}
			}
		});
	}
	
	// Method that wipes all users from the currently connected database.
	async deleteAllUsers(){
		return await this.connectionHandler(async (connection)=>{
			try{
				await connection.query(
					"DELETE FROM users");
				return{
					boolean: true,
					response : "All users deleted successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, all users couldn't be deleted."
				}
			}
		});
	}
	
	// Method that adds a new document to the database.
	async addDocument(title, body, author, email, type){
		return await this.connectionHandler(async(connection)=>{
			try{
				const [res] = await connection.query(
				"INSERT INTO documents (title, body, author, email, type) VALUES (?, ?, ?, ?, ?)",
				[title, body, author, email, type]
				);
				const documentId = res.id;
				return{
					id: documentId,
					boolean: true,
					response: "Document added successfully!"
				};
			}
			catch(error){
				/*
					Duplication error code returned indicates that the title of the proposed document 
					already exists in the database. 
				
				*/
				if(error.errno === 1062){
					return{
						boolean: false,
						response: "That Document already exists."
					};
				}
				else{
					return{
						boolean: false,
						response: "Error, document couldn't be created."
					};
				}
			}
		});
	}
	
	// Method that deletes a document from the database based on the given title.
	async deleteDocument(title){
		return await this.connectionHandler(async (connection)=>{
			try{
				await connection.query(
					"DELETE FROM documents WHERE title = ?",
					[title]
				);
				return{
					boolean: true,
					response : "Document deleted successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, document couldn't be deleted."
				}
			}
		});
	}
	
}

export default databaseService;
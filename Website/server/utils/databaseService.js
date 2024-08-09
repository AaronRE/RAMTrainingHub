// A layer of abstraction to wrap around the database class. Will help keep the database code decoupled from the rest of the application.
// Will allow us to interact with the database class indirectly, making it more easily extendable and maintainable.

class databaseService{
	constructor(database){
		this.database = database;
	}
	
	async getInitConnection(){
		try{
			await this.database.initConnection();
		}
		catch(error){
			throw error;
		}	
	}	
	
	async getEndConnection(){
		try{
			await this.database.endConnection();
		}
		catch(error){
			throw error;
		}	
	}
	
	getConnection(){
		return this.database.getConnection();
	}
	
	async checkIfUserExistsById(id){
		try{
			let connection = this.database.getConnection();
			let [res] = await connection.query("SELECT * FROM users WHERE id = ?", [id]);
			if(res.length > 0 && res[0].id === id){
				return true;
			}
			else{
				return false;
			}
		}
		catch(error){
			throw error;
		}
	}
	
	async addUser(firstName, lastName, username, password, email){
		
		try{
			let connection = this.database.getConnection();
			await connection.query(
			"INSERT INTO users (firstName, lastName, userName, user_password, email) VALUES (?, ?, ?, ?, ?)",
			[firstName, lastName, username, password, email]
			);
			return{
				response: "User added successfully!"
			};
		}
		catch(error){
			console.log(error);
			if(error.errno === 1062){
				return{
					response: "That Username already exists"
				};
			}
			else{
				return{
					response: "Error, user couldn't be created"
				};
			}
		}
	}
	
}

export default databaseService;




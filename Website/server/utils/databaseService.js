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
	
}

export default databaseService;




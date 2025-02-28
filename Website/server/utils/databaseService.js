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
				const userId = res.insertId;;
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
	
	// Method that retrieves the user data associated to the given username from the connected database.
	async getUserData(username){
		return await this.connectionHandler(async (connection)=>{
			try{
				const [userData] = await connection.query(
					"SELECT * FROM users WHERE userName = ?",
					[username]
				);
				return{
					userData: userData,
					boolean: true,
					response : "User data retrieved successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, user data couldn't be retrieved."
				}
			}
		});
	}
	
	// Method that verifies if the given username and its password exists in the datase.
	async userLogin(username, password){
		return await this.connectionHandler(async (connection)=>{
			try{
				let [userData] = await connection.query(
					"SELECT * FROM users WHERE userName = ?",
					[username]
				);
				
				if(userData.length === 0){
					return{
						boolean: false,
						response : "Incorrect username and or password."
					}
				}
				
				userData = userData[0];
				
				if(userData.userName === username && userData.user_password === password){
					return{
						boolean: true,
						response : "Logged in successfully!"
					}
				}
				else{
					return{
						boolean: false,
						response : "Incorrect username and or password."
					}
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, couldn't log in."
				}
			}
		});
	}
	
	// Method that adds a new document to the database.
	async addDocument(moduleId, title, body, author, email, type){
		return await this.connectionHandler(async(connection)=>{
			try{
				const [res] = await connection.query(
					"INSERT INTO documents (module_id, title, body, author, email, type) VALUES (?, ?, ?, ?, ?, ?)",
					[moduleId, title, body, author, email, type]
				);
				const documentId = res.insertId;
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
	
	// Method that wipes all documents from the currently connected database.
	async deleteAllDocuments(){
		return await this.connectionHandler(async (connection)=>{
			try{
				await connection.query(
					"DELETE FROM documents");
				return{
					boolean: true,
					response : "All documents deleted successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, all documents couldn't be deleted."
				}
			}
		});
	}
	
	// Method that retrieves all documents from the currently connected database.
	async getDocuments(){
		return await this.connectionHandler(async (connection)=>{
			try{
				const [documents] = await connection.query(
					"SELECT * FROM documents",
				);
				return{
					documents: documents,
					boolean: true,
					response : "All documents retrieved successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, documents couldn't be retrieved."
				}
			}
		});
	}
	
	// Method that adds a new image to the given document by its id.
	async addImage(documentId, imageName, imageLink){
		return await this.connectionHandler(async(connection)=>{
			try{
				const [res] = await connection.query(
					"INSERT INTO images (document_id, image_name, image_link) VALUES (?, ?, ?)",
					[documentId, imageName, imageLink]
				);
				const imageId = res.insertId;
				return{
					id: imageId,
					boolean: true,
					response: "Image added successfully!"
				};
			}
			catch(error){
				/*
					Duplication error code returned indicates that the name of the proposed image 
					already exists in the database. 
				
				*/
				if(error.errno === 1062){
					return{
						boolean: false,
						response: "That image already exists."
					};
				}
				else{
					return{
						boolean: false,
						response: "Error, image couldn't be added."
					};
				}
			}
		});
	}
	
	// Method that deletes an image from a given docuemnt based on the given image name.
	async deleteImage(imageName){
		return await this.connectionHandler(async (connection)=>{
			try{
				await connection.query(
					"DELETE FROM images WHERE image_name = ?",
					[imageName]
				);
				return{
					boolean: true,
					response : "Image deleted successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, image couldn't be deleted."
				}
			}
		});
	}
	
	// Method that wipes all the images from the currently connected database.
	async deleteAllImages(){
		return await this.connectionHandler(async (connection)=>{
			try{
				await connection.query(
					"DELETE FROM images");
				return{
					boolean: true,
					response : "All images deleted successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, all images couldn't be deleted."
				}
			}
		});
	}
	
	// Method that retrieves all the images associated to the given document id from the connected database.
	async getImages(documentId){
		return await this.connectionHandler(async (connection)=>{
			try{
				const [images] = await connection.query(
					"SELECT * FROM images WHERE document_id = ?",
					[documentId]
				);
				return{
					images: images,
					boolean: true,
					response : "All images retrieved successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, images couldn't be retrieved."
				}
			}
		});
	}
	
	// Method that adds a new module to the database.
	async addModule(title, body){
		return await this.connectionHandler(async(connection)=>{
			try{
				const [res] = await connection.query(
					"INSERT INTO modules (title, body) VALUES (?, ?)",
					[title, body]
				);
				const moduleId = res.insertId;
				return{
					id: moduleId,
					boolean: true,
					response: "Module added successfully!"
				};
			}
			catch(error){
				/*
					Duplication error code returned indicates that the title of the proposed module 
					already exists in the database. 
					
				*/
				if(error.errno === 1062){
					return{
						boolean: false,
						response: "That Module already exists."
					};
				}
				else{
					return{
						boolean: false,
						response: "Error, Module couldn't be created."
					};
				}
			}
		});
	}
	
	// Method that deletes a module from the database based on the given title.
	async deleteModule(title){
		return await this.connectionHandler(async (connection)=>{
			try{
				await connection.query(
					"DELETE FROM modules WHERE title = ?",
					[title]
				);
				return{
					boolean: true,
					response : "Module deleted successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, module couldn't be deleted."
				}
			}
		});
	}
	
	// Method that wipes all modules from the currently connected database.
	async deleteAllModules(){
		return await this.connectionHandler(async (connection)=>{
			try{
				await connection.query(
					"DELETE FROM modules");
				return{
					boolean: true,
					response : "All modules deleted successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, all modules couldn't be deleted."
				}
			}
		});
	}
	
	// Method that retrieves all modules from the currently connected database.
	async getModules(){
		return await this.connectionHandler(async (connection)=>{
			try{
				const [modules] = await connection.query(
					"SELECT * FROM modules",
				);
				return{
					modules: modules,
					boolean: true,
					response : "All modules retrieved successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, modules couldn't be retrieved."
				}
			}
		});
	}
	
	// Method that retrieves all the documents associated to the given module id from the connected database.
	async getModuleDocuments(moduleId){
		return await this.connectionHandler(async (connection)=>{
			try{
				const [documents] = await connection.query(
					"SELECT * FROM documents WHERE module_id = ?",
					[moduleId]
				);
				return{
					documents: documents,
					boolean: true,
					response : "All documents associated to the given moduleId retrieved successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, documents couldn't be retrieved."
				}
			}
		});
	}
	
	// Method that adds a new quiz to the database.
	async addQuiz(moduleId, title, body){
		return await this.connectionHandler(async(connection)=>{
			try{
				const [res] = await connection.query(
					"INSERT INTO quizzes (module_id, title, body) VALUES (?, ?, ?)",
					[moduleId, title, body]
				);
				const quizId = res.insertId;
				return{
					id: quizId,
					boolean: true,
					response: "Quiz added successfully!"
				};
			}
			catch(error){
				/*
					Duplication error code returned indicates that the title of the proposed quiz 
					already exists in the database. 
					
				*/
				if(error.errno === 1062){
					return{
						boolean: false,
						response: "That Quiz already exists."
					};
				}
				else{
					return{
						boolean: false,
						response: "Error, Quiz couldn't be created."
					};
				}
			}
		});
	}
	
	// Method that deletes a quiz from the database based on the given title.
	async deleteQuiz(title){
		return await this.connectionHandler(async (connection)=>{
			try{
				await connection.query(
					"DELETE FROM quizzes WHERE title = ?",
					[title]
				);
				return{
					boolean: true,
					response : "Quiz deleted successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, quiz couldn't be deleted."
				}
			}
		});
	}
	
	// Method that wipes all quizzes from the currently connected database.
	async deleteAllQuizzes(){
		return await this.connectionHandler(async (connection)=>{
			try{
				await connection.query(
					"DELETE FROM quizzes");
				return{
					boolean: true,
					response : "All quizzes deleted successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, all quizzes couldn't be deleted."
				}
			}
		});
	}
	
	// Method that retrieves all the quizzes associated to the given module id from the connected database.
	async getQuizzes(moduleId){
		return await this.connectionHandler(async (connection)=>{
			try{
				const [quizzes] = await connection.query(
					"SELECT * FROM quizzes WHERE module_id = ?",
					[moduleId]
				);
				return{
					quizzes: quizzes,
					boolean: true,
					response : "All quizzes retrieved successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, quizzes couldn't be retrieved."
				}
			}
		});
	}
	
	// Method that adds a new quiz question to the database.
	async addQuizQuestion(quizId, question, answers, correctAnswer){
		return await this.connectionHandler(async(connection)=>{
			try{
				const answersJson = JSON.stringify(answers);
				const [res] = await connection.query(
					"INSERT INTO quiz_questions (quiz_id, question, answers, correct_answer) VALUES (?, ?, ?, ?)",
					[quizId, question, answersJson, correctAnswer]
				);
				const quizQuestionId = res.insertId;
				return{
					id: quizQuestionId,
					boolean: true,
					response: "Quiz question added successfully!"
				};
			}
			catch(error){
				return{
					boolean: false,
					response: "Error, quizQuestion couldn't be created."
				};
			}
		});
	}
	
	// Method that deletes a quiz question from the database based on its id.
	async deleteQuizQuestion(id){
		return await this.connectionHandler(async (connection)=>{
			try{
				await connection.query(
					"DELETE FROM quiz_questions WHERE id = ?",
					[id]
				);
				return{
					boolean: true,
					response : "Quiz question deleted successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, quiz question couldn't be deleted."
				}
			}
		});
	}
	
	// Method that wipes all quiz questions from the currently connected database.
	async deleteAllQuizQuestions(){
		return await this.connectionHandler(async (connection)=>{
			try{
				await connection.query(
					"DELETE FROM quiz_questions");
				return{
					boolean: true,
					response : "All quiz questions deleted successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, all quiz questions couldn't be deleted."
				}
			}
		});
	}
	
	// Method that retrieves all the quiz questions associated to a quiz id from the currently connected database.
	async getQuizQuestions(quizId){
		return await this.connectionHandler(async (connection)=>{
			try{
				const [quizQuestions] = await connection.query(
					"SELECT * FROM quiz_questions WHERE quiz_id = ?",
					[quizId]
				);
				return{
					quizQuestions: quizQuestions,
					boolean: true,
					response : "All questions associated to the given quiz retrieved successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, quiz questions couldn't be retrieved."
				}
			}
		});
	}
	
	
	// Method that adds a new quiz attempt to the database.
	async addQuizAttempt(userId, quizId, isFinished){
		return await this.connectionHandler(async(connection)=>{
			try{
				const [res] = await connection.query(
					"INSERT INTO quiz_attempts (user_id, quiz_id, is_finished) VALUES (?, ?, ?)",
					[userId, quizId, isFinished]
				);
				const quizAttemptId = res.insertId;
				return{
					id: quizAttemptId,
					boolean: true,
					response: "Quiz attempt added successfully!"
				};
			}
			catch(error){
				console.log(error);
				return{
					boolean: false,
					response: "Error, quiz attempt couldn't be created."
				};
			}
		});
	}
	
	// Method that deletes a quiz attempt from the database based on its id.
	async deleteQuizAttempt(id){
		return await this.connectionHandler(async (connection)=>{
			try{
				await connection.query(
					"DELETE FROM quiz_attempts WHERE id = ?",
					[id]
				);
				return{
					boolean: true,
					response : "Quiz attempt deleted successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, quiz attempt couldn't be deleted."
				}
			}
		});
	}
	
	// Method that wipes all quiz attempts from the currently connected database.
	async deleteAllQuizAttempts(){
		return await this.connectionHandler(async (connection)=>{
			try{
				await connection.query(
					"DELETE FROM quiz_attempts");
				return{
					boolean: true,
					response : "All quiz attempts deleted successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, all quiz attempts couldn't be deleted."
				}
			}
		});
	}
	
	// Method that retrieves all the quiz attempts associated to a user id from the currently connected database.
	async getQuizAttempts(userId){
		return await this.connectionHandler(async (connection)=>{
			try{
				const [quizAttempts] = await connection.query(
					"SELECT * FROM quiz_attempts WHERE user_id = ?",
					[userId]
				);
				return{
					quizAttempts: quizAttempts,
					boolean: true,
					response : "All quiz attempts associated to the given user retrieved successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, quiz attempts couldn't be retrieved."
				}
			}
		});
	}
	
	// Method that adds a new quiz answer to the database.
	async addQuizAnswer(quizAttemptId, quizQuestionId, answer){
		return await this.connectionHandler(async(connection)=>{
			try{
				const [res] = await connection.query(
					"INSERT INTO quiz_answers (quiz_attempt_id, quiz_question_id, answer) VALUES (?, ?, ?)",
					[quizAttemptId, quizQuestionId, answer]
				);
				const quizAnswerId = res.insertId;
				return{
					id: quizAnswerId,
					boolean: true,
					response: "Quiz answer added successfully!"
				};
			}
			catch(error){
				return{
					boolean: false,
					response: "Error, quiz answer couldn't be created."
				};
			}
		});
	}
	
	// Method that deletes a quiz answer from the database based on its id.
	async deleteQuizAnswer(id){
		return await this.connectionHandler(async (connection)=>{
			try{
				await connection.query(
					"DELETE FROM quiz_answers WHERE id = ?",
					[id]
				);
				return{
					boolean: true,
					response : "Quiz answer deleted successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, quiz answer couldn't be deleted."
				}
			}
		});
	}
	
	// Method that wipes all quiz answers from the currently connected database.
	async deleteAllQuizAnswers(){
		return await this.connectionHandler(async (connection)=>{
			try{
				await connection.query(
					"DELETE FROM quiz_answers");
				return{
					boolean: true,
					response : "All quiz answers deleted successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, all quiz answers couldn't be deleted."
				}
			}
		});
	}
	
	// Method that retrieves all the quiz answers associated to the given quiz attempt id from the currently connected database.
	async getQuizAnswers(quizAttemptId){
		return await this.connectionHandler(async (connection)=>{
			try{
				const [quizAnswers] = await connection.query(
					"SELECT * FROM quiz_answers WHERE quiz_attempt_id = ?",
					[quizAttemptId]
				);
				return{
					quizAnswers: quizAnswers,
					boolean: true,
					response : "All quiz answers associated to the given quiz attempt id retrieved successfully!"
				}
			}
			catch(error){
				console.error(error);
				return{
					boolean: false,
					response: "Error, quiz answers couldn't be retrieved."
				}
			}
		});
	}
}

export default databaseService;
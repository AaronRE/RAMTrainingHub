import databaseService from "../../../utils/databaseService.js";
import {expect} from "chai";

describe("Database connection and methods", ()=>{
	let res;
	let dbWrapper;
	let connection;
	beforeEach(async()=>{
		dbWrapper = new databaseService();
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
		afterEach(async()=>{
			await dbWrapper.deleteAllUsers();
		});
		
		it("should return true if the user already exists", async ()=>{
			try{
				await dbWrapper.addUser("test", "test", "tester123416", "test123", "test@publix.com");
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
				res = await dbWrapper.addUser("test", "test", "tester123416", "test123", "test@publix.com");
				expect(res.boolean).to.equal(true);
			}
			catch(error){
				throw error;
			}
		});
		
		it("should return the data associated to the given username\"", async()=>{
			try{
				res = await dbWrapper.addUser("test", "test", "tester123416", "test123", "test@publix.com");
				res = await dbWrapper.getUserData("tester123416");
				expect(res.boolean).to.equal(true);
			}
			catch(error){
				throw error;
			}
		});
		
	});
	
	// Document related tests
	describe("Document methods", ()=>{
		let module;
		beforeEach(async()=>{
			await dbWrapper.deleteAllDocuments();
		});		
		afterEach(async()=>{
			await dbWrapper.deleteAllDocuments();
		});
		
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
				res = await dbWrapper.addDocument(null, "test", "test", "tester123416", "test123", "manual");
				expect(res.boolean).to.equal(true);
				}
			catch(error){
				console.log(res.response);
				throw error;
			}
		});
		
		it("should return true if all documents were successfully retrieved", async()=>{
			try{
				res = await dbWrapper.addDocument(null, "test", "test", "tester123416", "test123", "manual");
				res = await dbWrapper.addDocument(null, "test2", "test2", "tester1234167", "test1234", "manual");
				res = await dbWrapper.getDocuments();
				expect(res.boolean).to.equal(true);
				}
			catch(error){
				console.log(res.response);
				throw error;
			}
		});
		
		it("should return true if all documents associated to the given moduleId were successfully retrieved", async()=>{
			try{
				module = await dbWrapper.addModule("Rack Down", "This is a test");
				res = await dbWrapper.addDocument(module.id, "test", "test", "tester123416", "test123", "manual");
				res = await dbWrapper.addDocument(module.id, "test2", "test2", "tester1234167", "test1234", "manual");
				res = await dbWrapper.getModuleDocuments(module.id);
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
			doc = await dbWrapper.addDocument(null, "test", "test", "tester123416", "test123", "manual");
		});
		
		afterEach(async()=>{
			await dbWrapper.deleteAllDocuments();
			await dbWrapper.deleteAllImages();
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
				res = await dbWrapper.addImage(doc.id, "test", "https://google.com");
				expect(res.boolean).to.equal(true);
				}
			catch(error){
				console.log(res.response);
				throw error;
			}
		});
		
		it("should return all of the images associated to an existing document", async()=>{
			try{
				res = await dbWrapper.addImage(doc.id, "test", "https://google.com");
				res = await dbWrapper.getImages(doc.id);
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
		
		afterEach(async()=>{
			await dbWrapper.deleteAllModules();
		});
		
		it("it should delete an existing module", async()=>{
			try{
				await dbWrapper.addModule("Rack Down", "This is a test");
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
				await dbWrapper.addModule("Rack Down", "This is a test");
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
				await dbWrapper.addModule("Rack Down", "This is a test");
				res = await dbWrapper.getModules();
				expect(res.boolean).to.equal(true);
				}
			catch(error){
				console.log(res.response);
				throw error;
			}
		});
	});
	
	// Quiz related tests
	describe("Quiz methods", ()=>{	
		let module;
		beforeEach(async()=>{
			module = await dbWrapper.addModule("Rack Down", "This is a test");
		});
		
		afterEach(async()=>{
			await dbWrapper.deleteAllModules();
		});
		
		it("it should delete an existing quiz", async()=>{
			try{
				await dbWrapper.addQuiz(module.id,"Rack Down", "This is a test");
				res = await dbWrapper.deleteQuiz("Rack Down");
				expect(res.boolean).to.equal(true);
			}
			catch(error){
				throw error;
			}
		});
		
		it("should return true if all quizzes are successfully deleted", async()=>{
			try{
				res = await dbWrapper.deleteAllQuizzes();
				expect(res.boolean).to.equal(true);
			}
			catch(error){
				throw error;
			}
		});
		
		it("should return true if there isn't a duplicate quiz", async()=>{
			try{
				res = await dbWrapper.addQuiz(module.id, "Rack Down", "This is a test");
				expect(res.boolean).to.equal(true);
				}
			catch(error){
				console.log(res.response);
				throw error;
			}
		});
		
		it("should return false if there is a duplicate quiz", async()=>{
			try{
				await dbWrapper.addQuiz(module.id, "Rack Down", "This is a test");
				res = await dbWrapper.addQuiz(module.id, "Rack Down", "This is a test");
				expect(res.boolean).to.equal(false);
				}
			catch(error){
				console.log(res.response);
				throw error;
			}
		});
		
		it("should return all of the quizzes from the database associated to the given moduleId", async()=>{
			try{
				await dbWrapper.addQuiz(module.id,"Rack Down", "This is a test");
				res = await dbWrapper.getQuizzes(module.id);
				expect(res.boolean).to.equal(true);
				}
			catch(error){
				console.log(res.response);
				throw error;
			}
		});
	});
	
	// Quiz Question related tests
	describe("Quiz Question methods", ()=>{	
		let module;
		let quiz;
		let correctAnswer = 'A';
		let question = "What is a Severity 1 Rack Down Work Emergency Work Order? Explain in detail."
		let quizAnswersJson = {
			A: "A".repeat(30),
			B: "B".repeat(30),
			C: "C".repeat(30),
			D: "D".repeat(30)
		}
		
		beforeEach(async()=>{
			module = await dbWrapper.addModule("Rack Down", "This is a test");
			quiz = await dbWrapper.addQuiz(module.id, "Rack Down", "This is a test");
		});
		
		afterEach(async()=>{
			await dbWrapper.deleteAllModules();
		});
		
		it("should return true if it succesfully adds a quiz question", async()=>{
			try{
				res = await dbWrapper.addQuizQuestion(quiz.id, question, quizAnswersJson, correctAnswer);
				expect(res.boolean).to.equal(true);
				}
			catch(error){
				console.log(res.response);
				throw error;
			}
		});
		
		it("it should delete an existing quiz question", async()=>{
			try{
				res = await dbWrapper.addQuizQuestion(quiz.id, question, quizAnswersJson, correctAnswer);
				res = await dbWrapper.deleteQuizQuestion(res.id);
				expect(res.boolean).to.equal(true);
			}
			catch(error){
				throw error;
			}
		});
		
		it("should return true if all quiz questions are successfully deleted", async()=>{
			try{
				res = await dbWrapper.deleteAllQuizQuestions();
				expect(res.boolean).to.equal(true);
			}
			catch(error){
				throw error;
			}
		});
		
		it("should return all of the quiz questions from the database associated to the given quizId", async()=>{
			try{
				res = await dbWrapper.addQuizQuestion(quiz.id, question, quizAnswersJson, correctAnswer);
				res = await dbWrapper.getQuizQuestions(quiz.id);
				expect(res.boolean).to.equal(true);
				}
			catch(error){
				console.log(res.response);
				throw error;
			}
		});
	});
	
	// Quiz Question related tests
	describe("Quiz Attempt methods", ()=>{	
		let user;
		let module;
		let quiz;
		let isFinished = false;
		beforeEach(async()=>{
			user = await dbWrapper.addUser("test", "test", "test12345", "test12345", "test123@gmail.com");
			module = await dbWrapper.addModule("Rack Down", "This is a test");
			quiz = await dbWrapper.addQuiz(module.id, "Rack Down", "This is a test");
		});
		
		afterEach(async()=>{
			await dbWrapper.deleteAllUsers();
			await dbWrapper.deleteAllModules();
		});
		
		it("should return true if it succesfully adds a quiz attempt", async()=>{
			try{
				res = await dbWrapper.addQuizAttempt(user.id, quiz.id, isFinished);
				expect(res.boolean).to.equal(true);
				}
			catch(error){
				console.log(res.response);
				throw error;
			}
		});
		
		it("it should delete an existing quiz attempt", async()=>{
			try{
				res = await dbWrapper.addQuizAttempt(user.id, quiz.id, isFinished);
				res = await dbWrapper.deleteQuizAttempt(res.id);
				expect(res.boolean).to.equal(true);
			}
			catch(error){
				throw error;
			}
		});
		
		it("should return true if all quiz attempts are successfully deleted", async()=>{
			try{
				res = await dbWrapper.deleteAllQuizAttempts();
				expect(res.boolean).to.equal(true);
			}
			catch(error){
				throw error;
			}
		});
		
		it("should return all of the quiz attempts from the database associated to the given user id", async()=>{
			try{
				res = await dbWrapper.addQuizAttempt(user.id, quiz.id, isFinished);
				res = await dbWrapper.getQuizAttempts(user.id);
				expect(res.boolean).to.equal(true);
				}
			catch(error){
				console.log(res.response);
				throw error;
			}
		});
	});
	
	// Quiz Answer related tests
	describe("Quiz Answer methods", ()=>{
		let user;	
		let module;
		let quiz;
		let quizAttempt;
		let quizQuestion;
		let correctAnswer = 'A';
		let question = "What is a Severity 1 Rack Down Work Emergency Work Order? Explain in detail."
		let quizAnswersJson = {
			A: "A".repeat(30),
			B: "B".repeat(30),
			C: "C".repeat(30),
			D: "D".repeat(30)
		}
		let isFinished = false;
		let answer = 'A';
		
		beforeEach(async()=>{
			user = await dbWrapper.addUser("test", "test", "test12345", "test12345", "test123@gmail.com");
			module = await dbWrapper.addModule("Rack Down", "This is a test");
			quiz = await dbWrapper.addQuiz(module.id, "Rack Down", "This is a test");
			quizAttempt = await dbWrapper.addQuizAttempt(user.id, quiz.id, isFinished);
			quizQuestion = await dbWrapper.addQuizQuestion(quiz.id, question, quizAnswersJson, correctAnswer);
		});
		
		afterEach(async()=>{
			await dbWrapper.deleteAllUsers();
			await dbWrapper.deleteAllModules();
		});
		
		it("should return true if it succesfully adds a quiz answer", async()=>{
			try{
				res = await dbWrapper.addQuizAnswer(quizAttempt.id, quizQuestion.id, answer);
				expect(res.boolean).to.equal(true);
				}
			catch(error){
				console.log(res.response);
				throw error;
			}
		});
		
		it("it should delete an existing quiz answer", async()=>{
			try{
				res = await dbWrapper.addQuizAnswer(quizAttempt.id, quizQuestion.id, answer);
				res = await dbWrapper.deleteQuizAnswer(res.id);
				expect(res.boolean).to.equal(true);
			}
			catch(error){
				throw error;
			}
		});
		
		it("should return true if all quiz answers are successfully deleted", async()=>{
			try{
				res = await dbWrapper.deleteAllQuizAnswers();
				expect(res.boolean).to.equal(true);
			}
			catch(error){
				throw error;
			}
		});
		
		it("should return all of the quiz answers from the database associated to the given quizAttemptId", async()=>{
			try{
				res = await dbWrapper.addQuizAnswer(quizAttempt.id, quizQuestion.id, answer);
				res = await dbWrapper.getQuizAnswers(quizAttempt.id);
				expect(res.boolean).to.equal(true);
				}
			catch(error){
				console.log(res.response);
				throw error;
			}
		});
	});
});
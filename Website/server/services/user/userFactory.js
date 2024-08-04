import User from "../../entities/user.js";

/* A function that keeps the details of how user entity objects are instantiated hidden from the rest of the application.
 If the user entity is redefined, implementing those changes will be easy.
 Will also keep the business logic releated to creating users seperate from the entity itself.
*/

function createUser(id, username, password, email){
	return new User(id, username, password, email);
}

export default createUser;

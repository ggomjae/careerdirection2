const userController = require('../../controllers/user')

interface User{
  uno: number             
  name: String  
  password: String
  email: String
  roles: String
  createdAt: Date
  updatedAt: Date
}

const queries = {
  helloWorld(_: void, args: void): String{
    return userController.tempfunction();
  },
  userlist(_: void, args: void): Array<User>{
    return userController.userlist();
  }
};

module.exports = {
  queries
}
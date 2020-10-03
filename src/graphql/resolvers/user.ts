const userController = require('../../controllers/user')
import * as userType from '../../types/usertype';

const queries = {
  userlist(_: void, args: void): Array<userType.User>{
    return userController.userlist();
  },
  signup(_: void, args: { signupInput: {name:string, email:string, password:string}}): userType.User{
    return userController.signup();
  }
};

module.exports = {
  queries
}
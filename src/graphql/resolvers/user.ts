const userController = require('../../controllers/user')
import * as userType from '../../types/usertype';

const queries = {
  helloWorld(_: void, args: void): String{
    return userController.tempfunction();
  },
  userlist(_: void, args: void): Array<userType.User>{
    return userController.userlist();
  }
};

module.exports = {
  queries
}
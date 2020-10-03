const userService = require('../services/user');
import * as userType from '../types/usertype';
//=======================================
//             User Controller
//=======================================


const userlist = () => {
  return userService.userList();
}
const signup = (parent:any, { signupInput: {name, email, password} }:any) => {
  return userService.signup(parent, { signupInput: {name, email, password} });
}


module.exports = {
  signup,
  userlist
};
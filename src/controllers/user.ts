const userService = require('../services/user');

//=======================================
//             User Controller
//=======================================

const tempfunction = () => {
  return userService.temp();
}

const userlist = () => {
  return userService.userList();
}

module.exports = {
  tempfunction,
  userlist
};
const userService = require('../services/user');

//=======================================
//             User Controller
//=======================================

const tempfunction = () => {
  return userService.temp();
}

module.exports = {
  tempfunction
};
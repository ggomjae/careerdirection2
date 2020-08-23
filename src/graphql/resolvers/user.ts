const userController = require('../../controllers/user')

const queries = {
  helloWorld(_: void, args: void): string {
    return userController.tempfunction();
  }
};

module.exports = {
  queries
}
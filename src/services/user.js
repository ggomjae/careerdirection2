const { users } = require('../models');


const temp = () => {
  return "temp";
}

// User List Method - temp Method
const userList = () => {
  return new Promise((resolve, reject) => {
    users.findAll({})
      .then((users) => {
        resolve(users);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


module.exports = {
  //userList,
  temp,
  userList
}
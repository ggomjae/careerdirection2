const { users } = require('../models');
import * as userType from '../types/usertype';

const temp = () => {
  return "temp";
}

// User List Method - temp Method
const userList = () => {
  return new Promise<userType.User[]>((resolve, reject) => {
    users.findAll({})
      .then((users:userType.User[]) => {
        resolve(users);
      })
      .catch((err:Error) => {
        reject(err);
      });
  });
}


module.exports = {
  //userList,
  temp,
  userList
}
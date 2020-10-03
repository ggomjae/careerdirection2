const { users } = require('../models');
import * as userType from '../types/usertype';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = 10;

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

// User signup Method 
const signup = (parent:any, { signupInput: {name, email, password}}:any) => {
  
  return new Promise<userType.User>((resolve, reject) => {
    
    // 만약 같은 email이 있는 user가 존재한다면 false를 반환
    users.findOne({where : { 'email' : email }})
    .then((user:userType.User) => {
      if(user){
        resolve(user);
      }
    })
    .catch((err:Error) => {
      reject(new Error("ERROR"));
    })
    
    // 같은 email을 갖는 user가 없다면 DB에 user 생성 후, true를 반환
    bcrypt.hash(password, saltRounds, function(err:Error, passwordHash:String) {
      
      const newUser = {
        'name' : name,
        'password' : passwordHash,
        'email' : email,
        'roles': "user"
      }

      users.create(newUser)
        .then((user:userType.User) => {
          resolve(user);
        })
        .catch((err:Error) => {
          reject(err);
        });
    });
  });
}

module.exports = {
  signup,
  userList
}
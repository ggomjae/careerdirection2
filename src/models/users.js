module.exports = (sequelize, Sequelize) => {

  // String == varchar(255)
  return sequelize.define('user', {
    uno: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      // 일반적으로 255 or 20 으로 하는데 20으로 설정
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    password: {
      // bcrypt 128
      type: Sequelize.STRING(128),
      allowNull: false
    },
    email: {
      //local 64, @ 1 , domain 255
      type: Sequelize.STRING(320),
      allowNull: false,
      unique: true
    },
    roles: {
      type: Sequelize.STRING(20),
      allowNull: false
    }
  },{ timestamps: true });
}
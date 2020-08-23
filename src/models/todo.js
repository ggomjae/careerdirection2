//=======================================
//             Todo Model
//=======================================

module.exports = (sequelize, Sequelize) => {
  return sequelize.define('todo', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM,
      values: ['TODO', 'DONE'],
      allowNull: false
    },
    deadline: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });
};
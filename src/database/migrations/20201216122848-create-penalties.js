'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('penalties', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('penalties');
  }
};

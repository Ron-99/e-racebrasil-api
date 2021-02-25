'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('drivers_participated', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      driver_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'drivers', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'teams', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      season_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'seasons', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      reserve: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      created_by:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      updated_by:{
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
      },

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('drivers_participated');
  }
};

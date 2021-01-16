'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ranks_participated', { 
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
      rank_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ranks', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

  down: async (queryInterface) => {
    await queryInterface.dropTable('ranks_participated');
  }
};

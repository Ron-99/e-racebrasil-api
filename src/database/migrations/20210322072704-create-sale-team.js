'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sale_team', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'teams', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      startsIn: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endsIn: {
        type: Sequelize.DATE,
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

  down: async (queryInterface) => {
    await queryInterface.dropTable('sale_team');
  }
};

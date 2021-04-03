'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sale_team_rank', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      temp_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'temp_teams', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      sale_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'sale_team', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      coins: {
        type: Sequelize.DOUBLE,
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
    await queryInterface.dropTable('sale_team_rank');
  }
};

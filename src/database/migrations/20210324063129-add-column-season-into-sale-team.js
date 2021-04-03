'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('sale_team', 'season_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'seasons', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('sale_team', 'season_id');
  }
};
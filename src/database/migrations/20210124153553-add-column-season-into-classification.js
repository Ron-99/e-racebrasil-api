'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('classification', 'season_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'seasons', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('classification', 'season_id');
  }
};
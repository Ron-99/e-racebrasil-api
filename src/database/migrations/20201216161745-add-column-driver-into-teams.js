'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('teams', 'driver_id', Sequelize.INTEGER);
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('teams', 'driver_id');
  }
};

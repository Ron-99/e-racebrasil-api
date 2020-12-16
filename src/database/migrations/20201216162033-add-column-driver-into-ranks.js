'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ranks', 'driver_id', Sequelize.INTEGER);
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('ranks', 'driver_id');
  }
};

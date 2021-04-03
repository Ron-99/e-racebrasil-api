'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('drivers', 'coins', {
      type: Sequelize.DOUBLE,
      allowNull: false
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('drivers', 'coins');
  }
};
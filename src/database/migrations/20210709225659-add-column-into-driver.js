'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('drivers', 'number', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('drivers', 'number');
  }
};

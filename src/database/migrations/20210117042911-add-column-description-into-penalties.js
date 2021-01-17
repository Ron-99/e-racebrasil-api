'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('penalties', 'description', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('penalties', 'description');
  }
};
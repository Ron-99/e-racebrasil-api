'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('classification', 'date', {
      type: Sequelize.DATEONLY,
      allowNull: false
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('classification', 'date');
  }
};
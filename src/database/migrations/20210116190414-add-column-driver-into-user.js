'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'driver_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'drivers', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'driver_id');
  }
};
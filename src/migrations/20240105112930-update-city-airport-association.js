'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Airports', {
      name: 'city_fkey_constraint',
      type: 'foreign key',
      fields: ['cityId'],
      references: {
        table: 'Cities',
        field: 'id'
      },
      onDelete: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeConstraint('Airports', 'city_fkey_constraint')
  }
};
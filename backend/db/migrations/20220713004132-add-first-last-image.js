'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('Users', 'firstName', { type: Sequelize.STRING(50), allowNull: false }),
    await queryInterface.addColumn('Users', 'lastName', { type: Sequelize.STRING(50), allowNull: false }),
    await queryInterface.addColumn('Users', 'previewImage', { type: Sequelize.STRING(100) })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Users', 'firstName'),
    await queryInterface.removeColumn('Users', 'lastName'),
    await queryInterface.removeColumn('Users', 'previewImage')
  }
};

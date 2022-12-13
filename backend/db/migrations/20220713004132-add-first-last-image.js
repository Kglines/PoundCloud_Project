'use strict';

let options = {}
options.tableName = 'Users';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn(options, 'firstName', { type: Sequelize.STRING(50), allowNull: false }),
    await queryInterface.addColumn(options, 'lastName', { type: Sequelize.STRING(50), allowNull: false }),
    await queryInterface.addColumn(options, 'previewImage', { type: Sequelize.STRING(100) })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(options, 'firstName'),
    await queryInterface.removeColumn(options, 'lastName'),
    await queryInterface.removeColumn(options, 'previewImage')
  }
};

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Artists', [
    {
      userId: 1,
      previewImage: 'Artist Art'
    },
    {
      userId: 2,
      previewImage: 'Artist Art'
    },
    {
      userId: 3,
      previewImage: 'Artist Art'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Artists', null, {})
  }
};

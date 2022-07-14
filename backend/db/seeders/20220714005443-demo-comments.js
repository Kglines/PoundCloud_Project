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
   await queryInterface.bulkInsert('Comments', [
    {
      userId: 1,
      songId: 1,
      body: 'This is the best song1!'
    },
    {
      userId: 2,
      songId: 2,
      body: 'This is the best song2!'
    },
    {
      userId: 3,
      songId: 3,
      body: 'This is the best song3!'
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
  }
};

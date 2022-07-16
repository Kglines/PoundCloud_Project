'use strict';

const { query } = require("express");

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
   await queryInterface.bulkInsert('Albums', [
    {
      artistId: 1,
      userId: 1,
      title: 'Album1',
      description: 'Album1 description',
      previewImage: 'Album Art'
    },
    {
      artistId: 2,
      userId: 2,
      title: 'Album2',
      description: 'Album2 description',
      previewImage: 'Album Art'
    },
    {
      artistId: 3,
      userId: 3,
      title: 'Album3',
      description: 'Album3 description',
      previewImage: 'Album Art'
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
    await queryInterface.bulkDelete('Albums', null, {});
  }
};

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
      userId: 1,
      title: 'Album1',
      description: 'Album1 description',
      previewImage: 'Album Art'
    },
    {
      userId: 2,
      title: 'Album2',
      description: 'Album2 description',
      previewImage: 'Album Art'
    },
    {
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

'use strict';

const { Op } = require('sequelize');

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
   await queryInterface.bulkInsert('Songs', [
    {
      userId: 1,
      artistId: 1,
      albumId: 1,
      title: 'Title1',
      description: 'Description1',
      url: 'www.song1.com',
      previewImage: 'Song Art 1'
    },
    {
      userId: 2,
      artistId: 2,
      albumId: 2,
      title: 'Title2',
      description: 'Description2',
      url: 'www.song2.com',
      previewImage: 'Song Art 2'
    },
    {
      userId: 3,
      artistId: 3,
      albumId: 3,
      title: 'Title3',
      description: 'Description3',
      url: 'www.song2.com',
      previewImage: 'Song Art 3'
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
     await queryInterface.bulkDelete('Songs', null, {})
  }
};

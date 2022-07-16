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
   await queryInterface.bulkInsert('Playlists', [
    {
      userId: 1,
      name: 'Playlist1',
      previewImage: 'Image1'
    },
    {
      userId: 2,
      name: 'Playlist2',
      previewImage: 'Image2'
    },
    {
      userId: 3,
      name: 'Playlist3',
      previewImage: 'Image3'
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
    await queryInterface.bulkDelete('Playlists', null, {});
  }
};

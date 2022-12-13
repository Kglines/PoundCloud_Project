'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

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
   options.tableName = 'Playlists';
   await queryInterface.bulkInsert(options, [
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
    options.tableName = 'Playlists';
    await queryInterface.bulkDelete(options, null, {});
  }
};

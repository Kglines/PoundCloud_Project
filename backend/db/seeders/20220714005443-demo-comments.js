'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    
   options.tableName = 'Comments';
   await queryInterface.bulkInsert(options, [
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
    
    options.tableName = 'Comments';
    await queryInterface.bulkDelete(options, null, {});
  }
};

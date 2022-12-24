'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    
   options.tableName = 'Playlists';
   await queryInterface.bulkInsert(options, [
     {
       userId: 1,
       name: 'Playlist1',
       previewImage:
         'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
     },
     {
       userId: 2,
       name: 'Playlist2',
       previewImage:
         'https://images.unsplash.com/photo-1458560871784-56d23406c091?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80',
     },
     {
       userId: 3,
       name: 'Playlist3',
       previewImage:
         'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
     },
   ]);
  },

  async down (queryInterface, Sequelize) {
    
    options.tableName = 'Playlists';
    await queryInterface.bulkDelete(options, null, {});
  }
};

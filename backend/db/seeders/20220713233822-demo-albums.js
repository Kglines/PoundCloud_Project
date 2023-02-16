'use strict';

const { query } = require("express");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    
   options.tableName = 'Albums';
   await queryInterface.bulkInsert(options, [
     {
       userId: 1,
       title: 'Album1',
       description: 'Album1 description',
       previewImage:
         'https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=639&q=80',
     },
     {
       userId: 1,
       title: 'Heavy Metal',
       description: 'Heavy Metal',
       previewImage:
         'https://images.unsplash.com/photo-1598214015728-bc73871186d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2952&q=80',
     },
     {
       userId: 1,
       title: 'Welding Art',
       description: 'Welding Art',
       previewImage:
         'https://plus.unsplash.com/premium_photo-1663012869057-6833154b6fe4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
     },
     {
       userId: 2,
       title: 'Album2',
       description: 'Album2 description',
       previewImage:
         'https://images.unsplash.com/photo-1496483353456-90997957cf99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=770&q=80',
     },
     {
       userId: 2,
       title: 'Change',
       description: 'Change',
       previewImage:
         'https://plus.unsplash.com/premium_photo-1658506946139-c66ae55ad6da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
     },
     {
       userId: 2,
       title: 'Wired',
       description: 'Wired',
       previewImage:
         'https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
     },
     {
       userId: 3,
       title: 'Album3',
       description: 'Album3 description',
       previewImage:
         'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
     },
     {
       userId: 3,
       title: 'Tattoo Taboo',
       description: 'Tattoo Taboo',
       previewImage:
         'https://images.unsplash.com/photo-1641309942461-a08a0770b3ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
     },
     {
       userId: 3,
       title: 'Live Show',
       description: 'Live Show',
       previewImage:
         'https://images.unsplash.com/photo-1563841930606-67e2bce48b78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
     },
   ]);
  },

  async down (queryInterface, Sequelize) {
    
    options.tableName = 'Albums';
    await queryInterface.bulkDelete(options, null, {});
  }
};

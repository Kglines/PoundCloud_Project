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
       userId: 2,
       title: 'Album2',
       description: 'Album2 description',
       previewImage:
         'https://images.unsplash.com/photo-1496483353456-90997957cf99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=770&q=80',
     },
     {
       userId: 3,
       title: 'Album3',
       description: 'Album3 description',
       previewImage:
         'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
     },
   ]);
  },

  async down (queryInterface, Sequelize) {
    
    options.tableName = 'Albums';
    await queryInterface.bulkDelete(options, null, {});
  }
};

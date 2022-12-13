'use strict';

const { Op } = require('sequelize');

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
   options.tableName = 'Songs';
   await queryInterface.bulkInsert(options, [
     {
       userId: 1,
       albumId: 1,
       title: 'Title1',
       description: 'Description1',
       url: 'www.song1.com',
       previewImage:
         'https://images.unsplash.com/photo-1500640963716-929a14d94483?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
     },
     {
       userId: 2,
       albumId: 2,
       title: 'Title2',
       description: 'Description2',
       url: 'www.song2.com',
       previewImage:
         'https://images.unsplash.com/photo-1506792006437-256b665541e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
     },
     {
       userId: 3,
       albumId: 3,
       title: 'Title3',
       description: 'Description3',
       url: 'www.song2.com',
       previewImage:
         'https://images.unsplash.com/photo-1588581282844-4c6eea7bd3d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
     },
   ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Songs';
     await queryInterface.bulkDelete(options, null, {})
  }
};

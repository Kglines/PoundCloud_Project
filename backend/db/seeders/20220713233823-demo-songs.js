'use strict';

const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    
   options.tableName = 'Songs';
   await queryInterface.bulkInsert(options, [
     {
       userId: 1,
       albumId: 1,
       title: 'Title1',
       description: 'Description1',
       url: 'https://app-academy-project-soundcloud.s3.us-east-2.amazonaws.com/1671290681813.mp3',
       previewImage:
         'https://images.unsplash.com/photo-1500640963716-929a14d94483?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
     },
     {
       userId: 2,
       albumId: 2,
       title: 'Title2',
       description: 'Description2',
       url: 'https://app-academy-project-soundcloud.s3.us-east-2.amazonaws.com/1671984165176.mp3',
       previewImage:
         'https://images.unsplash.com/photo-1506792006437-256b665541e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
     },
     {
       userId: 3,
       albumId: 3,
       title: 'Title3',
       description: 'Description3',
       url: 'https://app-academy-project-soundcloud.s3.us-east-2.amazonaws.com/1671588465141.mp3',
       previewImage:
         'https://images.unsplash.com/photo-1588581282844-4c6eea7bd3d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
     },
   ]);
  },

  async down (queryInterface, Sequelize) {
    
    options.tableName = 'Songs';
     await queryInterface.bulkDelete(options, null, {})
  }
};

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
       title: 'Ghost',
       description: 'Ghost',
       url: 'https://app-academy-project-soundcloud.s3.us-east-2.amazonaws.com/1671678166200.mp3',
       previewImage:
         'https://images.unsplash.com/photo-1530605290309-ebfe523e6605?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80',
     },
     {
       userId: 1,
       albumId: 1,
       title: 'More Ghosts',
       description: 'More Ghost',
       url: 'https://app-academy-project-soundcloud.s3.us-east-2.amazonaws.com/1671678166200.mp3',
       previewImage:
         'https://images.unsplash.com/photo-1587356256760-8a5c346cd3a4?q=80&w=2371&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
     },
     {
       userId: 1,
       albumId: 2,
       title: 'Entitled',
       description: 'Entitled',
       url: 'https://app-academy-project-soundcloud.s3.us-east-2.amazonaws.com/1671678166200.mp3',
       previewImage:
         'https://images.unsplash.com/photo-1474169482634-9d0381a70510?q=80&w=2464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
     },
     {
       userId: 2,
       albumId: 7,
       title: 'Title2',
       description: 'Description2',
       url: 'https://app-academy-project-soundcloud.s3.us-east-2.amazonaws.com/1671984165176.mp3',
       previewImage:
         'https://images.unsplash.com/photo-1506792006437-256b665541e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
     },
     {
       userId: 3,
       albumId: 10,
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

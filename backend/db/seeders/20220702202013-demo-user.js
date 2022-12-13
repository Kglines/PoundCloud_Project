'use strict';
const bcrypt = require("bcryptjs");
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
   up: (queryInterface, Sequelize) => {
    
   options.tableName = 'Users'
   return queryInterface.bulkInsert(options, [
    {
      firstName: 'Demo',
      lastName: 'lition',
      email: 'demo@user.io',
      username: 'Demo-lition',
      hashedPassword: bcrypt.hashSync('password'),
      previewImage: 'www.image.com'
    },
    {
      firstName: 'Fake1',
      lastName: 'User1',
      email: 'user1@user.io',
      username: 'FakeUser1',
      hashedPassword: bcrypt.hashSync('password2'),
      previewImage: 'www.image.com'
    },
    {
      firstName: 'Fake2',
      lastName: 'User2',
      email: 'user2@user.io',
      username: 'FakeUser2',
      hashedPassword: bcrypt.hashSync('password3'),
      previewImage: 'www.image.com'
    }
   ], {})
  },

  down: (queryInterface, Sequelize) => {
    
    options.tableName = 'Users'
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {})
  }
};



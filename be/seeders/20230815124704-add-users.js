'use strict';

const { fakerID_ID: faker } = require("@faker-js/faker");
const config = require("../config/config");
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const users = [];

    for (let i = 0; i < 10; i++) {
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: bcrypt.hashSync("challenge9", 8),
        total_score: faker.number.int(100),
        bio: faker.person.bio(),
        city: faker.location.city(),
        social_media_url: faker.internet.url(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert(
      { schema: config.development.schema, tableName: "user" },
      users,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};

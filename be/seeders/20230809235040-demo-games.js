"use strict";

const { fakerID_ID: faker } = require("@faker-js/faker");
const config = require("../config/config");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const games = [];

    for (let i = 0; i < 10; i++) {
      games.push({
        name: faker.word.words(2),
        description: faker.lorem.paragraph(),
        thumbnail_url: faker.image.urlPicsumPhotos(),
        game_url: faker.internet.url(),
        play_count: faker.number.int(10),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert(
      { schema: config.development.schema, tableName: "game" },
      games,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      { schema: config.development.schema, tableName: "games" },
      null,
      {}
    );
  },
};

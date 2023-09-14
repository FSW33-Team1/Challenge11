"use strict";
const { Sequelize, Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static register = ({ username, password }) => {
      console.log('got here, creating')
      return this.create({ username, password })
    }
  }

  User.init(
    {
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      total_score: DataTypes.INTEGER,
      bio: DataTypes.STRING,
      city: DataTypes.STRING,
      social_media_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "user",
    }
  );
  return User;
};

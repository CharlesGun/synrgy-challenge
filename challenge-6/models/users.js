'use strict';
const {
  Model, ENUM
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.cars, { as: 'createdCars', foreignKey: 'created_by' })
      users.hasMany(models.cars, { as: 'updatedCars', foreignKey: 'updated_by' })
      users.hasMany(models.cars, { as: 'deletedCars', foreignKey: 'deleted_by' })
    }
  }
  users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    refresh_token: DataTypes.TEXT,
    role: ENUM('admin', 'user', 'superadmin')
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};

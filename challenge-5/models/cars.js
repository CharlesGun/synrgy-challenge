'use strict';
const {
  Model, ENUM
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cars.hasMany(models.rented_by, { foreignKey: 'car_id', as: 'rented_by'})
    }
  }
  cars.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    status: ENUM('AVAILABLE', 'RENTED')
  }, {
    sequelize,
    modelName: 'cars',
  });
  return cars;
};

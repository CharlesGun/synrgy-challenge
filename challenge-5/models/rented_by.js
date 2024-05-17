'use strict';
const {
  Model, ENUM
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rented_by extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      rented_by.belongsTo(models.users, { foreignKey: 'user_id' })
      rented_by.belongsTo(models.cars, { foreignKey: 'car_id'})
    }
  }
  rented_by.init({
    user_id: DataTypes.INTEGER,
    car_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    status: DataTypes.ENUM('ACTIVE', 'RETURNED'),
    total_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'rented_by',
    tableName: 'rented_by'
  });
  return rented_by;
};

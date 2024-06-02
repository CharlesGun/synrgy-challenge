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
      cars.belongsTo(models.users, { as: 'creator', foreignKey: 'created_by' })
      cars.belongsTo(models.users, { as: 'updater', foreignKey: 'updated_by' })
      cars.belongsTo(models.users, { as: 'deleter', foreignKey: 'deleted_by' })
    }
  }
  cars.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    is_deleted: DataTypes.BOOLEAN,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    deleted_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cars',
  });
  return cars;
};

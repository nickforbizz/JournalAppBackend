'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JournalCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      JournalCategory.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  JournalCategory.init({
    title: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    content: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'JournalCategory',
  });
  return JournalCategory;
};
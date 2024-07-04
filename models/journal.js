'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Journal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Journal.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Journal.belongsTo(models.JournalCategory, { foreignKey: 'categoryId', as: 'category' });
    }
  }
  Journal.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    isPublished: DataTypes.BOOLEAN,
    mood:  DataTypes.ENUM('happy', 'sad', 'neutral', 'excited', 'angry'),
    reminder: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Journal',
  });
  return Journal;
};
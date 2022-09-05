'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.belongsTo(models.Album, { foreignKey: 'albumId' });
      Song.belongsTo(models.User, { foreignKey: 'userId', as: 'Artist' });
      Song.belongsToMany(models.Playlist, { through: models.PlaylistSong, foreignKey: 'songId', otherKey: 'playlistId' });
      Song.hasMany(models.Comment, { foreignKey: 'songId' });
    }
  }
  Song.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      }
    },
    albumId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      }
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [1, 50]
      }
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [1, 256]
      }
    },
    url: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    previewImage: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};

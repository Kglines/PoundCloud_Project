'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaylistSong extends Model {
    
    static associate(models) {
      // define association here
      PlaylistSong.belongsTo(models.Song, { foreignKey: 'songId' })
      PlaylistSong.belongsTo(models.Playlist, { foreignKey: 'playlistId' })
    }
  }
  PlaylistSong.init({
    playlistId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PlaylistSong',
  });
  return PlaylistSong;
};

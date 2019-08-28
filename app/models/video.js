'use strict';
module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    name: DataTypes.STRING,
    nameUrl: DataTypes.STRING,
    posterPath: DataTypes.STRING,
    videoUrl: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.TIME
  }, {});
  Video.associate = function(models) {
    // associations can be defined here
  };
  return Video;
};
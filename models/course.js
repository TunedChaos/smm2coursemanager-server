'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    CourseID: DataTypes.STRING,
    Submitter: DataTypes.STRING,
    Status: DataTypes.TINYINT
  }, {});
  Course.associate = function(models) {
    // associations can be defined here
  };
  return Course;
};
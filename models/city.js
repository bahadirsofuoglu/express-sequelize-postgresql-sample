"use strict";
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define(
    "City",
    {
      city_name: DataTypes.STRING,
    },
    {}
  );
  City.associate = function (models) {
    City.hasMany(models.Province, {
      foreignKey: "city_id",
      as: "provinces",
    });
  };
  return City;
};

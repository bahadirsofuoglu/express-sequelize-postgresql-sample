"use strict";
module.exports = (sequelize, DataTypes) => {
  const Province = sequelize.define(
    "Province",
    {
      city_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      prov_name: DataTypes.STRING,
    },
    {}
  );
  Province.associate = function (models) {
    Province.belongsTo(models.City, {
      foreignKey: "city_id",
    });
  };
  return Province;
};

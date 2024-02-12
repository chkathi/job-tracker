const { response } = require("express");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Creating association
  // Users has many jobs
  // Users.associate = (models) => {
  //   Users.hasMany(models.Jobs, {
  //     onDelete: "cascade",
  //   });
  // };

  return Users;
};

module.exports = (sequelize, DataTypes) => {
  const Jobs = sequelize.define("Jobs", {
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    applied: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  return Jobs;
};

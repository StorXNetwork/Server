module.exports = (sequelize, DataTypes) => {
  const secret = sequelize.define('secret', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      allowNull: false
    },
    token: {
      type: DataTypes.STRING(1356),
      allowNull: false
    }
  }, {
    timestamps: true,
    underscored: true,
    freezeTableName: true
  });
  return secret;
};

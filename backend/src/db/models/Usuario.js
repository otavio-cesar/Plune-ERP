module.exports = (sequelize, DataTypes) => {
  const table = sequelize.define(
    'Usuario',
    {
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
      permissao: DataTypes.INTEGER,
    },
    {
      freezeTableName: true
    }
  );
  table.associate = function (models) {

  };
  return table;
};
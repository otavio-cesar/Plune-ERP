module.exports = (sequelize, DataTypes) => {
  const table = sequelize.define(
    'Usuario',
    {
      nome: { type: DataTypes.STRING, primaryKey: true },
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
      permissao: DataTypes.INTEGER,
    },
    {
      freezeTableName: true
    }
  );
  return table;
};
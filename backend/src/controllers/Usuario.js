const { Usuario } = require("../db/models/index");
var jwt = require("jsonwebtoken");
const EnumPermissao = require("../util/EnumPermissao");
const UsuarioService = require("../services/Usuario");
const constants = require("../util/constants.json");

const usuarioService = new UsuarioService(Usuario);

module.exports = {

  async login(req, res) {
    const { emailNome, senha } = req.body;

    if (!emailNome || !senha) {
      return res.status(400).json({ error: "Usuário ou senha não informado!" });
    }

    const usuario = await usuarioService.ObterCompletoPorEmailOuNome(emailNome);
    if (!usuario) {
      return res.status(400).json({ error: "Usuario não encontrado!" });
    }

    if (usuario.senha !== senha) {
      return res.status(400).json({ error: "Senha inválida!" });
    }

    const token = jwt.sign(
      { email: usuario.email, senha: usuario.senha },
      constants.jwtConst,
      {
        expiresIn: 60 * 60 * 24 * 120, // ultimo digito é numero de dias
      }
    );

    res.setHeader('Token', token)

    const userResult = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      permissao: usuario.permissao,
    };

    return res.json(userResult);
  },
};
const { Usuario } = require("../db/models/index");
var jwt = require("jsonwebtoken");
const EnumPermissao = require("../util/EnumPermissao");
const UsuarioService = require("../services/Usuario");
const constants = require("../util/constants.json");

const usuarioService = new UsuarioService(Usuario);

module.exports = {
    
  async login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Email ou senha não informado!" });
    }
 
    const usuario = await usuarioService.ObterCompletoPorEmail(email);
    if (!usuario) {
      return res.status(400).json({ error: "Usuario não encontrado!" });
    }

    if (usuario.permissao === EnumPermissao.Basic) {
      return res.status(400).json({ error: "Usuário não tem acesso!" });
    }

    const token = jwt.sign(
      { email: usuario.email, senha: usuario.senha },
      constants.jwt,
      {
        expiresIn: 60 * 60 * 24 * 120, // ultimo digito é numero de dias
      }
    );

    res.headers['token'] = token

    const userResult = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      permissao: usuario.permissao,
    };

    return res.json(userResult);
  },
};
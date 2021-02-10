const BaseService = require('./BaseService');

class UsuarioService extends BaseService {

  constructor(AbstractClass) {
    super(AbstractClass);
    this.AbstractClass = AbstractClass;
  }

  async ObterCompletoPorEmail(email) {
    if (!email)
      return undefined;
    return await this.AbstractClass.findOne({
      where: {
        email
      }
    });
  }
}

module.exports = UsuarioService;
'use strict';

const axios = require('axios');

const api = axios.create({
  baseURL: 'https://suap.ifrn.edu.br/api'
});

const autenticar = (matricula, senha, callback) => {
  if (!matricula || !senha || !callback) {
    return callback(new Error('Argumentos inválidos.'));
  }
  api.post('/autenticacao/token/', {
      username: matricula,
      password: senha
    })
    .then((response) => {
      api.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;
      return callback(null, response.data);
    })
    .catch((error) => {
      if (error.response) {
        return callback(new Error('Falha na autenticação.'));
      }
      return callback(new Error('Falha na tentativa de autenticação.'));
    });
}

module.exports = {
  autenticar: autenticar
};

'use strict';

const axios = require('axios');

const api = axios.create({
  baseURL: 'https://suap.ifrn.edu.br/api'
});

const autenticar = (matricula, senha) => {
  if (!matricula || !senha) {
    return;
  }
  return api.post('/autenticacao/token/', {
      username: matricula,
      password: senha
    })
    .then((response) => {
      api.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;
      return response;
    });
}

module.exports = {
  autenticar: autenticar
};

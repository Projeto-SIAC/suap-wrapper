'use strict';

const axios = require('axios');

const api = axios.create({
  baseURL: 'https://suap.ifrn.edu.br/api'
});

const autenticar = (matricula, senha) => {
  if (!matricula || !senha) {
    console.log('Você precisa informar matrícula e senha.')
    return;
  }
  return api.post('/autenticacao/token/', {
      username: matricula,
      password: senha
    })
    .then((response) => {
      api.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;
      console.log(`Seu token é: <${response.data.token}>.`);
    })
    .catch((error) => {
      console.log('Falha na autenticação.');
    });
}

module.exports = {
  autenticar: autenticar
};

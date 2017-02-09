'use strict'

const axios = require('axios')

const api = axios.create({
  baseURL: 'https://suap.ifrn.edu.br/api/'
})

const autenticar = (matricula, senha) => {
  if (!matricula || !senha) {
    return new Promise(function(resolve, reject) {
      reject(Error('Argumentos inválidos.'))
    })
  }

  return api.post('autenticacao/token/', {
      username: matricula,
      password: senha
    })
    .then((response) => {
      api.defaults.headers.common['Authorization'] = `Token ${response.data.token}`
      return response.data.token
    })
    .catch((error) => {
      if (error.response) {
        throw new Error('Falha na autenticação.')
      }
      throw new Error('Falha na tentativa de autenticação.')
    })
}

module.exports = {
  autenticar
}

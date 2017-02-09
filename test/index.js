const test = require('ava')
const Suap = require('../index.js')
const nock = require('nock')

test('deve retornar erro quando matrícula for vazia', t => {
  return Suap.autenticar('', 'minh4senh4')
    .catch(err => t.true(err instanceof Error))
})

test('deve retornar erro quando senha for vazia', t => {
  return Suap.autenticar('20161014040012', '')
    .catch(err => t.true(err instanceof Error))
})

test('deve retornar token', t => {
  nock('https://suap.ifrn.edu.br/api/')
    .post('/autenticacao/token/', {
      username: '20161014040012',
      password: 'minh4senh4'
    })
    .reply(200, {
      token: 'abcdefghijklmnopqrstuvwxyz0123456789'
    })

  return Suap.autenticar('20161014040012', 'minh4senh4')
    .then(token => t.is(token, 'abcdefghijklmnopqrstuvwxyz0123456789'))
})

test('deve retornar erro de autenticacao', t => {
  nock('https://suap.ifrn.edu.br/api/')
    .post('/autenticacao/token/', {
      username: '20161014040012',
      password: 's3nh4errad4'
    })
    .reply(403)

  return Suap.autenticar('20161014040012', 's3nh4errad4')
    .catch(err => t.true(err instanceof Error))
})

test('deve retornar erro na solicitacao', t => {
  nock('https://suap.ifrn.edu.br/api/')
    .post('/autenticacao/token/', {
      username: '20161014040012',
      password: 'minh4senh4'
    })
    .replyWithError('No connection.')

  return Suap.autenticar('20161014040012', 'minh4senh4')
    .catch(err => t.true(err instanceof Error))
})

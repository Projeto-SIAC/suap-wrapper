const test = require('ava')
const Suap = require('../index.js')
const nock = require('nock')

test.cb('deve retornar erro quando matrícula for vazia', t => {
  Suap.autenticar('', 'minh4senh4', (err, data) => {
    t.true(err instanceof Error)
    t.end()
  })
})

test.cb('deve retornar erro quando senha for vazia', t => {
  Suap.autenticar('20161014040012', '', (err, data) => {
    t.true(err instanceof Error)
    t.end()
  })
})

test.cb('deve retornar token', t => {
  nock('https://suap.ifrn.edu.br/api/')
    .post('/autenticacao/token/', {
      username: '20161014040012',
      password: 'minh4senh4'
    })
    .reply(200, { token: 'abcdefghijklmnopqrstuvwxyz0123456789' })

  Suap.autenticar('20161014040012', 'minh4senh4', (err, data) => {
    t.deepEqual(data, {
      token: 'abcdefghijklmnopqrstuvwxyz0123456789'
    })
    t.end()
  })
})

test.cb('deve retornar erro de autenticacao', t => {
  nock('https://suap.ifrn.edu.br/api/')
    .post('/autenticacao/token/', {
      username: '20161014040012',
      password: 's3nh4errad4'
    })
    .reply(403)

  Suap.autenticar('20161014040012', 's3nh4errad4', (err, data) => {
    t.true(err instanceof Error)
    t.end()
  })
})

test.cb('deve retornar erro na solicitacao', t => {
  nock('https://suap.ifrn.edu.br/api/')
    .post('/autenticacao/token/', {
      username: '20161014040012',
      password: 'minh4senh4'
    })
    .replyWithError('No connection.')

  Suap.autenticar('20161014040012', 'minh4senh4', (err, data) => {
    t.true(err instanceof Error)
    t.end()
  })
})

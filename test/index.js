import test from 'ava'
import Suap from '../index.js'

test.cb('deve retornar erro quando matrícula for vazia', t => {
  Suap.autenticar('', 'minh4senh4', (err, data) => {
    t.true(err instanceof Error);
    t.end();
  });
});

test.cb('deve retornar erro quando senha for vazia', t => {
  Suap.autenticar('20161014040012', '', (err, data) => {
    t.true(err instanceof Error);
    t.end();
  });
});

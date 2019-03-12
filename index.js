'use strict'
const axios = require('axios')

const api = axios.create({
  baseURL: 'https://suap.ifrn.edu.br/api/v2/'
})

// Intercepta as respostas com status 401
api.interceptors.response.use(undefined, (error) => {
  if (error.response.status === 401) {
    return error.response.data.detail;
  }
});

const Suap = {}

/**
 * Obtém o token de um usuário
 * @param {string} matricula Matricula do usuario
 * @param {string} senha Senha do usuario
 * @returns {Promise}
 */
Suap.autenticar = (matricula, senha) => {
  if (!matricula || !senha) {
    return new Promise((resolve, reject) => {
      reject(Error('Argumentos inválidos.'))
    })
  }
  return api.post('autenticacao/token/', {
      username: matricula,
      password: senha
    })
    .then((response) => {
      api.defaults.headers.common['Authorization'] = `JWT ${response.data.token}`
      return response.data.token
    })
    .catch((error) => {
      if (error.response) {
        throw new Error('Falha na autenticação.')
      }
      throw new Error('Falha na tentativa de autenticação.')
    })
}

/**
 * Obtém o meu calendário administrativo do ano corrente (exige autenticação).
 * @returns {Promise}
 */
Suap.meusDados = () => {
  return api.get('minhas-informacoes/meus-dados/').then(response => {
    return response.data
  })
}

/**
 * Obtém informações sobre os meus processos (exige autenticação).
 * @returns {Promise}
 */
Suap.meusProcessos = () => {
  return api.get('minhas-informacoes/meus-processos/').then(response => {
    return response.data
  })
}

/**
 * Obtém as notas do aluno logado em um determinado período e ano letivo.
 * @param {number} ano ano letivo
 * @param {number} periodoLetivo periodo letivo
 * @returns {Promise}
 */
Suap.meuBoletim = (ano = 2019, periodoLetivo = 1) => {
  return api.get(`minhas-informacoes/boletim/${ano}/${periodoLetivo}`).then(response => {
    return response.data
  })
}

/**
 * Obtém uma lista de alunos paginada
 * 
 * @param {number} limit Número de resultados a serem retornados por página.
 * @param {number} offset O índice inicial do qual retornar os resultados.
 * @returns {Promise}
 */
Suap.alunos = (limit = 10, offset = 0) => {
  return api.get(`edu/alunos?limit=${limit}&offset=${offset}`).then(response => {
    return response.data
  })
}

/**
 * Obtém a lista de alunos ativos do campus e ano letivo indicado.
 * @param {string} siglaCampos sigla do campos
 * @param {number} anoLetivo ano letivo
 * @returns {Promise}
 */
Suap.alunosPorCampos = (siglaCampos = 'PAR', anoLetivo = 2019) => {
  return api.get(`edu/alunos/carometro/${siglaCampos}/${anoLetivo}`).then(response => {
    return response.data
  })
}

/**
 * Obtém os cursos dos Institutos
 * @param {number} limit Número de resultados a serem retornados por página.
 * @param {number} offset O índice inicial do qual retornar os resultados.
 * @returns {Promise}
 */
Suap.cursos = (limit = 10, offset = 0) => {
  return api.get(`edu/cursos?limit=${limit}&offset=${offset}`).then(response => {
    return response.data
  })
}

/**
 * Obtem um curso pelo código
 * @param {string} codigo Código de um curso
 * @returns {Promise}
 */
Suap.cursoByCodigo = (codigo) => {
  return api.get(`edu/cursos/${codigo}/`).then(response => {
    if (response) {
      return response.data;
    }
    return { detail: "Não encontrado." }
  })
}


/**
 * Obtém os planos individuais trabalho
 * @param {number} limit Número de resultados a serem retornados por página.
 * @param {number} offset O índice inicial do qual retornar os resultados.
 * @returns {Promise}
 */
Suap.planosIndividuaisTrabalho = (limit = 10, offset = 0) => {
  return api.get(`edu/planos-individuais-trabalho?limit=${limit}&offset=${offset}`).then(response => {
    return response.data;
  })
}

/**
 * Obtém os planos individuais trabalho pela matricula
 * @param {number} matricula matriculo do aluno
 * @returns {Promise}
 */
Suap.planosIndividuaisTrabalhoByMatricula = (matricula) => {
  return api.get(`edu/planos-individuais-trabalho/${matricula}`).then(response => {
    return response.data;
  })
}

/**
 * Obtém uma lista de bolsistas
 * @param {number} limit Número de resultados a serem retornados por página.
 * @param {number} offset O índice inicial do qual retornar os resultados.
 * @returns {Promise}
 */
Suap.bolsas = (limit = 10, offset = 0) => {
  return api.get(`ae/bolsas?limit=${limit}&offset=${offset}`).then(response => {
    return response.data
  })
}

/**
 * Obtém um bolsista especifico
 * @param {number} id do bolsista
 * @returns {Promise}
 */
Suap.bolsasById = (id) => {
  return api.get(`ae/bolsas/${id}/`).then(response => {
    return response.data
  })
}

/**
 * Obtém uma lista dos programas das Intituições
 * @param {number} limit Número de resultados a serem retornados por página.
 * @param {number} offset O índice inicial do qual retornar os resultados.
 * @returns {Promise}
 */
Suap.programas = (limit = 10, offset = 0) => {
  return api.get(`ae/programas?limit=${limit}&offset=${offset}`).then(response => {
    return response.data
  })
}

/**
 * Obtém um programa especifico
 * @param {number} id do programa
 * @returns {Promise}
 */
Suap.programasById = (id) => {
  return api.get(`ae/programas/${id}/`).then(response => {
    return response.data
  })
}

/**
 * Obtém os projetos de extensão dos Institutos
 * @param {number} limit Número de resultados a serem retornados por página.
 * @param {number} offset O índice inicial do qual retornar os resultados.
 * @returns {Promise}
 */
Suap.projetosExtensao = (limit = 10, offset = 0) => {
  return api.get(`extensao/projetos?limit=${limit}&offset=${offset}`).then(response => {
    return response.data;
  })
}

/**
 * Obtém um projeto de extensão especifico
 * @param {number} id id do projeto de extensão
 * @returns {Promise}
 */
Suap.projetosExtensaoById = (id) => {
  return api.get(`extensao/projetos/${id}/`).then(response => {
    return response.data;
  })
}

/**
 * Obtém os projetos de pesquisa dos Institutos
 * @param {number} limit Número de resultados a serem retornados por página.
 * @param {number} offset O índice inicial do qual retornar os resultados.
 * @returns {Promise}
 */
Suap.projetosPesquisa = (limit = 10, offset = 0) => {
  return api.get(`pesquisa/projetos?limit=${limit}&offset=${offset}`).then(response => {
    return response.data;
  })
}

/**
 * Obtém um projeto de pesquisa especifico
 * @param {number} id id do projeto de extensão
 * @returns {Promise}
 */
Suap.projetosPesquisaById = (id) => {
  return api.get(`pesquisa/projetos/${id}/`).then(response => {
    return response.data;
  })
}

/**
 * Obtém uma lista dos servidores.
 * @param {number} limit Número de resultados a serem retornados por página.
 * @param {number} offset O índice inicial do qual retornar os resultados.
 * @returns {Promise}
 */
Suap.servidores = (limit = 10, offset = 0) => {
  return api.get(`rh/servidores?limit=${limit}&offset=${offset}`).then(response => {
    return response.data
  })
}

/**
 * Obtém um servidor especifico.
 * @param {number} matricula matricula do servidor
 * @returns {Promise}
 */
Suap.servidoresByMatricula = (matricula) => {
  return api.get(`rh/servidores/${matricula}`).then(response => {
    return response.data
  })
}

/**
 * Obtém as novidades do sistema SUAP.
 * @param {number} limit Número de resultados a serem retornados por página.
 * @param {number} offset O índice inicial do qual retornar os resultados.
 * @returns {Promise}
 */
Suap.novidadesSuap = (limit = 10, offset = 0) => {
  return api.get(`ti/novidades-suap?limit=${limit}&offset=${offset}`).then(response => {
    return response.data
  })
}

module.exports = Suap

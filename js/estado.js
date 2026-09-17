export const estado = {
  tarefas: [],
  busca: '',
  status: '',
  prioridade: '',
  ordenacao: '',
  carregamento: 'carregando',
  erro: null
};

export function limparFiltros() {
  estado.busca = '';
  estado.status = '';
  estado.prioridade = '';
  estado.ordenacao = '';
}

export function derivarTarefas(estado) {

  const busca = estado.busca.toLowerCase().trim();

  let lista = estado.tarefas.filter(function (tarefa) {

    const okTitulo = tarefa.titulo.toLowerCase().includes(busca);
    const okStatus = !estado.status || tarefa.status === estado.status;
    const okPrioridade = !estado.prioridade || tarefa.prioridade === estado.prioridade;

    return okTitulo && okStatus && okPrioridade;
  });

  if (estado.ordenacao) {

    const copia = [...lista];

    copia.sort(function (a, b) {
      const dataA = new Date(a.prazo);
      const dataB = new Date(b.prazo);

      if (estado.ordenacao === 'prazo-asc') {
        return dataA - dataB;
      }

      return dataB - dataA;
    });

    lista = copia;
  }

  return lista;
}

const elStatus = document.getElementById('status-regiao');

export function renderizarMensagem(carregamento, erro, totalOriginal, totalVisivel) {

  if (carregamento === 'carregando') {
    elStatus.textContent = 'carregando o mundo...';
    return;
  }

  if (carregamento === 'erro') {

    let msg = 'deu erro ao carregar as tarefas';

    if (erro && erro.name === 'TypeError') {
      msg = 'sem conexao, tenta de novo';
    } else if (erro && erro.name === 'SyntaxError') {
      msg = 'os dados vieram errados (json invalido)';
    } else if (erro && erro.name === 'HttpError') {
      msg = 'arquivo nao encontrado (' + erro.message + ')';
    }

    elStatus.textContent = msg;
    return;
  }

  if (totalOriginal === 0) {
    elStatus.textContent = 'nenhum item no inventario';
    return;
  }

  if (totalVisivel === 0) {
    elStatus.textContent = '0 de ' + totalOriginal + ' itens. nada encontrado, tenta limpar os filtros';
    return;
  }

  elStatus.textContent = totalVisivel + ' de ' + totalOriginal + ' itens';
}

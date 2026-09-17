export async function carregarTarefas() {

  const resposta = await fetch('./tarefa.json');

  if (!resposta.ok) {
    const erro = new Error('Erro ' + resposta.status);
    erro.name = 'HttpError';
    throw erro;
  }

  const dados = await resposta.json();

  return dados.tarefas;
}

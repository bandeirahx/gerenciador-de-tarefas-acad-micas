import { carregarTarefas } from './api.js';
import { renderizarMensagem } from './estados.js';
import { renderizarTarefas } from './renderizacao.js';
import { estado, derivarTarefas, limparFiltros } from './estado.js';

function renderizarTudo() {

  const lista = derivarTarefas(estado);

  renderizarMensagem(
    estado.carregamento,
    estado.erro,
    estado.tarefas.length,
    lista.length
  );

  renderizarTarefas(estado.carregamento === 'erro' ? [] : lista);
}

async function inicializar() {

  estado.carregamento = 'carregando';
  renderizarTudo();

  try {
    const tarefas = await carregarTarefas();
    estado.tarefas = tarefas;
    estado.carregamento = 'sucesso';
    estado.erro = null;
  } catch (erro) {
    estado.carregamento = 'erro';
    estado.erro = erro;
  }

  renderizarTudo();
  configurarControles();
}

function configurarControles() {

  const campoBusca = document.getElementById('busca-titulo');
  const filtroStatus = document.getElementById('status-filtro');
  const filtroPrioridade = document.getElementById('prioridade-filtro');
  const filtroOrdenacao = document.getElementById('ordenacao-filtro');
  const botaoLimpar = document.getElementById('botao-limpar');

  campoBusca.addEventListener('input', function () {
    estado.busca = campoBusca.value;
    renderizarTudo();
  });

  filtroStatus.addEventListener('change', function () {
    estado.status = filtroStatus.value;
    renderizarTudo();
  });

  filtroPrioridade.addEventListener('change', function () {
    estado.prioridade = filtroPrioridade.value;
    renderizarTudo();
  });

  filtroOrdenacao.addEventListener('change', function () {
    estado.ordenacao = filtroOrdenacao.value;
    renderizarTudo();
  });

  botaoLimpar.addEventListener('click', function () {
    limparFiltros();

    campoBusca.value = '';
    filtroStatus.value = '';
    filtroPrioridade.value = '';
    filtroOrdenacao.value = '';

    renderizarTudo();
  });
}

window.estado = estado;

inicializar();

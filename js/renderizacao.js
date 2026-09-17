const listas = {
  fazer: document.getElementById('lista-fazer'),
  andamento: document.getElementById('lista-andamento'),
  revisao: document.getElementById('lista-revisao'),
  concluida: document.getElementById('lista-concluida')
};

const nomeMinerio = {
  baixa: 'ferro',
  media: 'ouro',
  alta: 'diamante'
};

export function renderizarTarefas(tarefas) {

  Object.values(listas).forEach(function (ul) {
    ul.innerHTML = '';
  });

  const contador = {
    fazer: 0,
    andamento: 0,
    revisao: 0,
    concluida: 0
  };

  tarefas.forEach(function (tarefa) {

    const ul = listas[tarefa.status];

    if (!ul) {
      return;
    }

    contador[tarefa.status]++;

    const li = document.createElement('li');
    const item = document.createElement('div');
    item.className = 'item';

    if (tarefa.status === 'concluida') {
      item.className += ' item-concluida';
    }

    const titulo = document.createElement('h3');
    titulo.textContent = tarefa.titulo;

    const prazo = document.createElement('p');
    prazo.textContent = 'prazo: ' + formatarData(tarefa.prazo);

    const tag = document.createElement('span');
    tag.className = 'tag tag-' + nomeMinerio[tarefa.prioridade];
    tag.textContent = nomeMinerio[tarefa.prioridade];

    item.appendChild(titulo);
    item.appendChild(prazo);
    item.appendChild(tag);

    if (tarefa.status !== 'concluida') {
      item.appendChild(montarXp(tarefa.prazo));
    }

    li.appendChild(item);
    ul.appendChild(li);
  });

  Object.keys(listas).forEach(function (status) {

    if (contador[status] === 0) {
      const li = document.createElement('li');
      const p = document.createElement('p');
      p.className = 'vazio';
      p.textContent = 'vazio';
      li.appendChild(p);
      listas[status].appendChild(li);
    }
  });
}

function montarXp(prazo) {

  const dias = diasAte(prazo);

  const barra = document.createElement('div');
  barra.className = 'xp';

  if (dias < 0) {
    barra.className += ' xp-atrasada';
  } else if (dias <= 3) {
    barra.className += ' xp-perto';
  }

  const cheia = document.createElement('div');
  cheia.className = 'xp-cheia';

  let porcentagem = 100;

  if (dias >= 0) {
    porcentagem = Math.max(100 - (dias / 20) * 100, 5);
  }

  cheia.style.width = porcentagem + '%';

  barra.appendChild(cheia);
  return barra;
}

function diasAte(prazo) {

  if (!prazo) {
    return 999;
  }

  const alvo = new Date(prazo + 'T00:00:00');
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  return Math.round((alvo - hoje) / 86400000);
}

function formatarData(data) {

  if (!data) {
    return 'sem data';
  }

  const partes = data.split('-');

  if (partes.length !== 3) {
    return data;
  }

  return partes[2] + '/' + partes[1] + '/' + partes[0];
}

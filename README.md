# Minha Base de Tarefas

Projeto de lista de tarefas inspirado no visual de Minecraft, criado como atividade da disciplina de Desenvolvimento Front-End da ULBRA.

A ideia foi transformar tarefas em itens de inventário: cada tarefa fica em um baú conforme o status, a prioridade vira um minério e a barra de prazo lembra uma barra de experiência. O objetivo é deixar o controle de atividades mais visual e até divertido de acompanhar.

## Sobre o projeto

O projeto simula uma base de tarefas com:

- busca por nome
- filtro por status
- filtro por prioridade
- ordenação por prazo
- indicação visual de tarefas próximas do vencimento ou atrasadas

A ideia do tema é bem simples: cada tarefa vira um item, cada status vira um baú e cada prioridade vira um minério. Isso deixa a organização mais intuitiva e com uma cara bem diferente do padrão de lista comum.

## Como rodar

Como o projeto faz fetch de um arquivo local, ele precisa ser executado em um servidor.

No terminal, dentro da pasta do projeto, rode:

```bash
python3 -m http.server 5500
```

Depois, abra no navegador:

```text
http://localhost:5500
```

## Estrutura dos arquivos

- js/estado.js: guarda o estado da aplicação e aplica filtros/ordenação
- js/api.js: busca os dados do arquivo JSON
- js/renderizacao.js: desenha os itens na tela
- js/estados.js: controla as mensagens de status e feedback da interface
- js/main.js: conecta tudo e inicializa a aplicação
- tarefa.json: contém as tarefas usadas no projeto

## Observação

Esse projeto foi pensado como uma versão mais criativa e visual de um gerenciador de tarefas, mantendo a funcionalidade principal e aproveitando o tema para deixar a interface mais memorável.

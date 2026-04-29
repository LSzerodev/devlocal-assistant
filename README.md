# DevLocal AI

DevLocal AI é uma extensão local-first para VS Code, ainda em desenvolvimento, focada em privacidade, modelos locais, Ollama, workflows offline-friendly e colaboração open-source.

> Status honesto: o projeto já tem uma base implementada e testável em ambiente de desenvolvimento, mas ainda não é uma extensão finalizada ou pronta para produção.

## Visão Geral

O objetivo do DevLocal AI é oferecer uma alternativa local-first para assistência de código e estudo dentro do VS Code. A direção do projeto é manter a experiência principal perto da máquina do usuário, com controle sobre o runtime, o modelo local e o fluxo de dados.

A proposta do projeto é:

- usar modelos locais em vez de depender obrigatoriamente de APIs em nuvem;
- integrar com Ollama como runtime local inicial;
- manter uma experiência amigável para uso offline depois do setup local;
- preservar privacidade por padrão, evitando envio automático de código e prompts para serviços externos;
- evoluir em público com contribuições da comunidade.

O projeto ainda está em fase inicial. Algumas partes já funcionam, outras estão parcialmente conectadas, e várias áreas importantes ainda precisam de acabamento, testes e validação de UX.

## Estado Atual do Projeto

O DevLocal AI já possui uma fundação real de extensão VS Code com webview em React, comunicação entre UI e extension host, persistência básica de configurações e integração inicial com Ollama.

Na prática, hoje o projeto está neste ponto:

- a extensão registra uma view do DevLocal AI na Activity Bar do VS Code;
- a UI principal roda dentro de uma webview;
- existe tela de chat e tela de Settings;
- a webview conversa com a extensão por um protocolo tipado;
- a extensão consegue carregar e salvar configurações básicas localmente;
- a extensão consegue testar conexão com Ollama e listar modelos locais via API;
- o chat já possui envio simples para Ollama usando `/api/generate`, sem streaming;
- estados de conexão, loading e erro já existem, mas ainda precisam ser refinados.

Isso significa que existe uma base funcional em desenvolvimento, não apenas um mock visual. Mesmo assim, o produto ainda precisa de melhorias antes de ser considerado estável.

## O Que Já Foi Implementado

### Extensão VS Code

- Scaffold básico de extensão VS Code em TypeScript.
- Registro da Activity Bar do DevLocal AI.
- Registro da webview `devlocalAI.chatView`.
- Comando `DevLocal AI: Open Chat Sidebar`.
- Bootstrap da extensão em `src/extension.ts`.
- Provider da webview em `src/chat/chatViewProvider.ts`.
- HTML da webview com CSP e nonce em `src/chat/getChatWebviewHtml.ts`.

### Webview e UI

- Aplicação React renderizada dentro da webview.
- Estrutura de UI componentizada para chat, sidebar e Settings.
- Tela de chat com composer, seleção de modelo e área de resposta.
- Tela de Settings com modelo atual, seleção de modelo, host do Ollama, teste de conexão e cards de infraestrutura.
- Estado local da UI organizado com reducer/controller.
- Build da webview com Rollup.
- CSS Modules e estilos globais para a UI atual.

### Comunicação Entre Webview e Extensão

- Protocolo tipado em `src/chat/protocol.ts`.
- Router de mensagens em `src/chat/messageRouter.ts`.
- Mensagens para:
  - carregar settings;
  - salvar settings;
  - testar conexão com Ollama;
  - enviar prompt para chat;
  - retornar loading, erro e resposta.

### Ollama e Configurações

- Host padrão do Ollama: `http://localhost:11434`.
- Normalização de host local.
- Persistência básica de `host` e `model` via `context.globalState`.
- Checagem inicial de conexão com Ollama.
- Verificação da CLI `ollama` disponível no `PATH`.
- Listagem de modelos locais via `/api/tags`.
- Envio de prompt via `/api/generate` com `stream: false`.

### Tooling

- Scripts npm para build, watch, lint e testes.
- TypeScript para extensão e webview.
- Rollup para bundle da webview.
- ESLint configurado.
- Teste inicial de extensão ainda em formato de exemplo.

## Stack Atual

- TypeScript.
- VS Code Extension API.
- React.
- CSS Modules e CSS global na webview atual.
- Rollup.
- ESLint.
- npm.

Observação: o README anterior mencionava Tailwind como direção de styling, mas o `package.json` atual não traz Tailwind configurado como dependência. Se Tailwind for mantido como escolha oficial, a configuração e a documentação dessa camada ainda precisam ser alinhadas.

## O Que Está em Desenvolvimento

As áreas abaixo já têm alguma base no código, mas ainda precisam de evolução:

- endurecimento do protocolo de mensagens entre webview e extensão;
- melhoria do fluxo de chat e do histórico de mensagens;
- melhoria dos estados de loading, erro e conexão;
- refinamento da integração com Ollama em cenários reais;
- UX da tela de Settings;
- persistência de mais opções da UI, além de `host` e `model`;
- testes úteis para router, protocolo, serviços e ativação da extensão;
- documentação de setup, arquitetura e contribuição.

## O Que Ainda Precisa Ser Implementado

Itens importantes ainda pendentes ou planejados:

- ajuste completo do layout da tela de Settings;
- orientação de modelos com base na quantidade de GB de RAM da máquina do usuário;
- definição de como obter ou informar a RAM disponível, seja por detecção, input do usuário ou combinação dos dois;
- recomendações de modelos por faixa de hardware, seguindo a ideia visual da referência `ref1.png`;
- persistência real para todos os controles relevantes da tela de Settings;
- instalação, atualização ou gerenciamento de modelos locais pela UI, se essa direção for mantida;
- streaming de respostas do Ollama;
- histórico de chat mais completo;
- melhor tratamento de erros de rede, host inválido, modelo ausente e timeout;
- acessibilidade da UI;
- validação runtime das mensagens entre webview e extensão;
- testes automatizados além do teste de exemplo atual;
- fluxo de release e empacotamento da extensão;
- suporte futuro a contexto local do projeto e base de conhecimento offline.

## Protótipo no Figma

Existe um layout prototipado no Figma para orientar a evolução visual da interface:

https://www.figma.com/design/3zseClvCrJ9F6lWBchEAbY/Untitled?node-id=1-4&t=3llQ0vkKlDK0Iibr-1

A referência visual `ref1.png` aponta especialmente para a tela de Settings. A ideia planejada é que essa tela ajude o usuário a entender qual tipo de modelo faz sentido para a máquina dele, usando faixas como:

- `< 4 GB`: modelos muito leves;
- `8 GB`: modelos pequenos e otimizados;
- `16 GB`: modelos intermediários;
- `32 GB+`: modelos maiores ou múltiplos modelos.

Hoje já existe uma base visual de cards de infraestrutura na Settings, mas ela ainda não está conectada a uma recomendação real de hardware/modelo. Essa é uma das áreas mais importantes para contribuição.

## Setup Local

### Pré-requisitos

- Node.js LTS.
- npm.
- VS Code.
- Ollama instalado, caso você queira testar o chat local de ponta a ponta.
- VS Code compatível com `^1.109.0`, conforme declarado no `package.json`.

### Instalando o projeto

```bash
git clone <URL_DO_REPOSITORIO>
cd devlocal-ia
npm install
```

### Rodando em modo desenvolvimento

Em um terminal, rode:

```bash
npm run watch
```

Depois, com o projeto aberto no VS Code:

1. Pressione `F5` no arquivo `extension.ts`
2. Aguarde abrir o `Extension Development Host`.
3. No novo VS Code, abra a Activity Bar do DevLocal AI.
4. Se quiser testar com Ollama, mantenha o Ollama rodando localmente e tenha ao menos um modelo instalado.

Exemplo para abaixar models direto pelo ollama:

```bash
ollama pull mistral
ollama serve
```

O host padrão esperado pela extensão é:

```text
http://localhost:11434
```

### Observação para Windows

Se o VS Code tentar executar tasks via WSL e você não tiver WSL instalado, altere o terminal padrão ou shell das tasks para PowerShell ou Command Prompt e rode `npm run watch` novamente.

## Scripts Úteis

| Script | Descrição |
| --- | --- |
| `npm run watch` | Roda watchers da extensão TypeScript e do bundle da webview. |
| `npm run compile` | Compila a webview e a extensão. |
| `npm run lint` | Roda ESLint em `src`. |
| `npm test` | Roda os testes da extensão via `vscode-test`. |
| `npm run build:webview` | Gera o bundle da webview. |
| `npm run watch:extension` | Observa mudanças na extensão TypeScript. |
| `npm run watch:webview:js` | Observa mudanças na webview com Rollup. |
| `npm run vscode:prepublish` | Executa o build usado antes de publicar/empacotar. |

## Arquitetura Resumida

O projeto é dividido em duas camadas principais:

1. Extension host do VS Code.
2. Webview UI em React.

O fluxo atual de comunicação segue esta ideia:

```text
React Webview UI
  -> mensagem tipada da webview
  -> ChatViewProvider
  -> messageRouter
  -> services/dependências
  -> resposta de volta para a webview
```

Papéis principais:

- `src/extension.ts`: ativa a extensão, registra a webview e injeta dependências.
- `src/chat/chatViewProvider.ts`: faz a ponte entre VS Code, webview e router.
- `src/chat/protocol.ts`: define o contrato de mensagens.
- `src/chat/messageRouter.ts`: centraliza o tratamento das mensagens.
- `src/services`: concentra integrações locais, começando por Ollama.
- `src/webview`: contém a aplicação React da interface.

## Estrutura do Projeto

```text
devlocal-ia/
|-- media/
|   |-- devlocal-ai.svg
|   `-- webview/
|-- src/
|   |-- chat/
|   |   |-- chatViewProvider.ts
|   |   |-- getChatWebviewHtml.ts
|   |   |-- messageRouter.ts
|   |   |-- ollamaHost.ts
|   |   `-- protocol.ts
|   |-- services/
|   |   |-- ollama.check.ts
|   |   `-- ollama.service.ts
|   |-- test/
|   |   `-- extension.test.ts
|   |-- webview/
|   |   |-- app/
|   |   |-- assets/
|   |   |-- components/
|   |   |-- styles/
|   |   |-- assets.d.ts
|   |   `-- main.tsx
|   `-- extension.ts
|-- .vscode/
|-- package.json
|-- rollup.config.mjs
|-- tsconfig.json
|-- eslint.config.mjs
|-- ref1.png
`-- README.md
```

### Notas Sobre a Estrutura

- `src/chat` concentra a ponte entre webview e extension host.
- `src/services` concentra serviços ligados ao runtime local, começando por Ollama.
- `src/webview` contém a aplicação React usada dentro da webview.
- `media/webview` recebe os arquivos gerados pelo build da webview.
- `out` recebe a saída compilada da extensão.

## Contribuindo com o Projeto

Contribuições são muito bem-vindas. O DevLocal AI ainda está em desenvolvimento, então há espaço para contribuições em código, documentação, design, testes, acessibilidade, arquitetura e feedback de uso.

Este projeto não está sendo apresentado como finalizado. A ideia é construir em público, com uma base honesta, iterativa e aberta para pessoas que queiram ajudar a transformar a fundação atual em uma extensão local-first realmente útil.

### Fluxo Recomendado para Contribuir

1. Faça um fork do repositório no GitHub.
2. Clone o seu fork localmente.
3. Instale as dependências:

```bash
npm install
```

4. Rode o projeto em modo desenvolvimento:

```bash
npm run watch
```

5. Abra o Extension Development Host com `F5` no VS Code.
6. Crie uma branch descritiva para sua contribuição:

```bash
git checkout -b feat/settings-ram-guidance
```

7. Faça mudanças pequenas e focadas sempre que possível.
8. Quando aplicável, rode:

```bash
npm run compile
npm run lint
npm test
```

9. Abra um Pull Request explicando claramente o que foi alterado e por quê.
10. Inclua screenshots ou vídeos curtos quando a mudança envolver UI.

### Boas Áreas Para Contribuir Agora

- melhorar o layout da tela de Settings;
- implementar orientação de modelos com base na RAM do usuário;
- conectar todos os controles da Settings com persistência real;
- integrar Ollama de forma funcional e mais robusta;
- melhorar o fluxo de chat;
- melhorar estados de loading, erro e conexão;
- melhorar acessibilidade da UI;
- adicionar testes;
- melhorar documentação e onboarding;
- revisar o protocolo de mensagens entre webview e extensão;
- validar melhor erros de host, modelo ausente e Ollama indisponível;
- melhorar a experiência de setup local para novos contribuidores.

### Expectativas Para Pull Requests

- Prefira PRs pequenos e focados.
- Explique o problema que o PR resolve.
- Descreva impactos em protocolo, estado ou UX quando existirem.
- Inclua screenshots ou vídeos curtos para mudanças visuais.
- Rode `npm run compile`, `npm run lint` e `npm test` quando fizer sentido.
- Não trate código parcial como produto finalizado sem deixar claro o estado da implementação.

Iniciantes podem começar com documentação, pequenos ajustes de UI, estados de erro, acessibilidade ou testes. Pessoas mais experientes podem ajudar na arquitetura de serviços, protocolo de mensagens, integração com Ollama, persistência e fluxo de chat.

## Roadmap

### Base da Extensão

- [x] Scaffold básico da extensão VS Code.
- [x] Activity Bar e webview inicial.
- [x] UI React dentro da webview.
- [x] Protocolo tipado inicial.
- [x] Router de mensagens.
- [x] Persistência básica de settings.
- [ ] Validação runtime do protocolo.
- [ ] Testes úteis para fluxo extension/webview.

### Ollama e Modelos Locais

- [x] Host padrão do Ollama.
- [x] Teste inicial de conexão.
- [x] Listagem de modelos locais.
- [x] Envio simples de prompt para `/api/generate`.
- [ ] Streaming de respostas.
- [ ] Diagnóstico melhor de instalação, host, timeout e modelos.
- [ ] Gerenciamento ou instalação de modelos pela UI, se adotado.

### Settings e UX

- [x] Tela inicial de Settings.
- [x] Seleção de modelo disponível no Ollama.
- [x] Salvamento básico de host/modelo.
- [ ] Ajuste do layout de Settings conforme Figma/ref1.
- [ ] Recomendações de modelo por GB de RAM.
- [ ] Persistência dos controles adicionais.
- [ ] Melhor acessibilidade e responsividade da webview.

### Chat e Contexto

- [x] Composer e envio simples de prompt.
- [x] Resposta básica do modelo.
- [ ] Histórico de conversa.
- [ ] Estados de erro e loading mais completos.
- [ ] Contexto local do projeto.
- [ ] Futuro suporte a base de conhecimento local/offline.

### Open Source

- [x] README com estado honesto do projeto.
- [ ] Guia de issues e PRs.
- [ ] Mais testes automatizados.
- [ ] Documentação de arquitetura.
- [ ] Processo de release e empacotamento.

## Licença

Este projeto está licenciado sob a Apache License 2.0.

Mantenha o arquivo `LICENSE` e o campo `license` do `package.json` alinhados em futuras mudanças.

## Autor

DevLocal AI é mantido por Luis e está sendo desenvolvido em público como uma extensão local-first, privacy-friendly e aberta à colaboração da comunidade.

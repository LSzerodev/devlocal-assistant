# DevLocal AI

Local-first AI for VS Code, built as an early-stage open-source project focused on privacy, local models, and offline-friendly developer workflows.

## About

DevLocal AI is a VS Code extension project designed to become a local-first coding and study assistant that runs inside the editor. The long-term goal is to give developers a practical alternative to cloud-dependent assistants by keeping the core experience close to the machine, close to the codebase, and under the user's control.

This repository is still in active development. The UI foundation is already in place, the webview and extension layers are being wired together, and the communication structure between both sides is taking shape. Real Ollama connectivity, persistent settings, richer chat behavior, and future local knowledge retrieval workflows are still in progress.

The project direction is privacy-friendly and offline-oriented:

- local models instead of mandatory cloud APIs
- developer-controlled runtime and model choice
- no reliance on external token billing for the core local experience
- future support for stronger local context and knowledge retrieval workflows

At the same time, this README is intentionally honest: DevLocal AI is not fully finished yet, and this repository should currently be treated as an early open-source foundation rather than a production-ready extension.

## Why This Project

There are good reasons to build a local-first assistant for VS Code:

- Privacy matters. Many developers want help inside the editor without sending code, prompts, or notes to external services by default.
- Local control matters. The user should be able to choose the model, the machine, and the tradeoffs.
- Cost predictability matters. A local workflow should not depend on recurring API token usage for its core experience.
- Offline-friendly tooling matters. The long-term vision is to let people study, prototype, and work even in environments with limited or no connectivity, once the local runtime and assets are already installed.
- Building in public matters. DevLocal AI is intended to grow with community feedback, community fixes, and shared learning.

This project is also a practical learning exercise in building a serious VS Code extension around:

- extension host and webview communication
- local AI integration
- UI state orchestration
- future retrieval-augmented local knowledge workflows
- transparent open-source iteration

## Current Status

DevLocal AI is in an early but meaningful stage. The project already has a visible foundation, but important parts of the real product flow are still being completed.

### Implemented

- VS Code activity bar container and chat webview registration
- sidebar/chat UI foundation
- settings UI foundation
- React-based webview application
- Tailwind-based styling pipeline for the webview
- componentized UI structure for the sidebar and settings screens
- HTML bootstrapping for the webview
- typed message protocol draft between webview and extension
- `messageRouter` structure for handling extension-side messages
- initial extension-to-webview and webview-to-extension wiring
- project layout prepared for future growth

### In Progress

- completion of real message routing behavior
- real chat flow integration between the UI and extension
- real Ollama connectivity
- settings load/save flow integration
- connection status flow
- UI state wiring based on extension responses
- better alignment between protocol types and actual UI behavior
- cleanup and hardening of the extension/webview boundary

### Planned

- real Ollama request handling
- local model selection and management
- connection testing flow
- persistent settings storage
- richer chat states
- response streaming
- better loading and error handling
- hardware-aware model guidance
- model suggestions based on the user's machine profile
- stronger code-aware assistance
- local knowledge retrieval / offline knowledge base support
- more complete tests
- contributor-friendly architecture improvements
- public open-source collaboration workflows

## Project Vision

The long-term vision for DevLocal AI is not only "chat inside VS Code." The broader goal is a local-first assistant that can help people while studying, debugging, and building software without forcing them into a cloud-only workflow.

The intended direction is:

- a VS Code-native assistant
- local model execution through tools such as Ollama
- user-controlled hardware and model choice
- an offline-friendly workflow after local setup is complete
- future support for local knowledge retrieval so the assistant can work with more than just raw conversation context

In other words, DevLocal AI aims to reduce dependence on external API billing and expand beyond plain prompt history by combining:

- local chat
- local project context
- future local knowledge retrieval

That vision is larger than what is already implemented in this repository today, but it is the direction this codebase is being built toward.

## Architecture Overview

At a high level, the project is split into two major layers:

1. The VS Code extension host
2. The webview UI

The current communication flow is designed like this:

```text
React Webview UI
  -> typed webview message
  -> extension-side chat view provider
  -> message router
  -> service/dependency layer
  -> response back to the webview
```

### Current architectural roles

- `src/extension.ts`
  Bootstraps the extension, registers the webview view provider, and provides the current dependency wiring.

- `src/chat/chatViewProvider.ts`
  Owns the VS Code webview integration and acts as the bridge between the webview and the extension host.

- `src/chat/protocol.ts`
  Defines the typed message contract between the webview and the extension.

- `src/chat/messageRouter.ts`
  Centralizes extension-side handling for supported message types such as settings, status checks, and chat requests.

- `src/webview/**`
  Contains the React application, UI components, and webview styling.

- `media/webview/**`
  Generated webview build artifacts used by the extension at runtime.

### Intended future architecture

As the project matures, this structure is expected to grow into clearer service layers for:

- Ollama communication
- settings persistence
- model and hardware recommendations
- richer chat state handling
- future local retrieval / knowledge workflows

## Project Structure

The current repository is organized around a clear extension/webview split:

```text
devlocal-ia/
├─ media/
│  ├─ devlocal-ai.svg
│  └─ webview/
├─ src/
│  ├─ chat/
│  │  ├─ chatViewProvider.ts
│  │  ├─ getChatWebviewHtml.ts
│  │  ├─ messageRouter.ts
│  │  └─ protocol.ts
│  ├─ test/
│  │  └─ extension.test.ts
│  ├─ webview/
│  │  ├─ app/
│  │  ├─ components/
│  │  ├─ styles/
│  │  ├─ assets/
│  │  ├─ assets.d.ts
│  │  └─ main.tsx
│  └─ extension.ts
├─ .vscode/
├─ package.json
├─ rollup.config.mjs
├─ tsconfig.json
└─ eslint.config.mjs
```

### Notes on the structure

- `src/chat` contains the extension-side chat/webview communication layer.
- `src/webview` contains the React UI that is bundled and injected into the VS Code webview.
- `media/webview` contains generated assets produced by the webview build pipeline.
- `out` is the TypeScript output for the extension runtime.

## Tech Stack

The current repository is built with:

- TypeScript
- VS Code Extension API
- React
- Tailwind CSS
- Rollup
- ESLint
- Node.js tooling via npm

UI-wise, the project follows a component-driven approach and uses patterns compatible with a modern design-system mindset. The current codebase does not yet include a full standalone shadcn/ui package setup, so the safest description today is:

- React + Tailwind webview UI
- reusable component structure inspired by modern design-system practices

## Running Locally

### Prerequisites

Recommended:

- Node.js LTS
- npm
- VS Code

Repository requirement:

- VS Code `^1.109.0` as declared in `package.json`

### Install dependencies

```bash
npm install
```

### Start the development watchers

This project uses separate watchers for:

- extension TypeScript compilation
- webview CSS build
- webview JS bundle

Run:

```bash
npm run watch
```

### Launch the extension in development mode

With the workspace open in VS Code:

1. Start the watcher task with `npm run watch`, or use the default VS Code task if it works correctly in your environment.
2. Press `F5` to open an `Extension Development Host`.
3. In the development host, open the DevLocal AI sidebar from the activity bar or run the command:

```text
DevLocal AI: Open Chat Sidebar
```

### Useful scripts

```bash
npm run compile
npm run lint
npm test
```

### Development notes

- `npm run compile` builds both the webview assets and the extension output.
- `npm run watch` is the main development command and is the easiest way to keep the webview and extension outputs updated together.
- The current webview build writes generated assets into `media/webview/`.
- Some current flows are intentionally incomplete because the project is still under active development.

### Windows note

If VS Code tries to launch tasks through WSL and you do not have WSL installed, switch your VS Code terminal/default task shell to PowerShell or Command Prompt and rerun the development task. This is an environment issue, not a DevLocal AI feature issue.

## Contributing

Contributions are welcome.

This repository is intentionally being opened before every feature is finished because early contributors can help shape both the architecture and the developer experience. If you want to help build a serious local-first AI extension for VS Code, this is a good time to join.

Please keep in mind:

- the project is still early-stage
- some flows are intentionally partial
- message routing and runtime integration are still evolving
- design, architecture, and developer experience are still open to improvement

### What contributors can help with

There are many useful contribution paths right now, including both small and large changes:

- improve extension/webview integration
- refine `messageRouter` structure and organization
- strengthen protocol typing and message safety
- help connect settings to persistent storage
- wire real Ollama requests into the extension layer
- improve connection status handling
- improve loading and error flows
- organize future service boundaries
- polish sidebar and settings UI behavior
- improve accessibility and UX details
- add tests around protocol, routing, and extension flows
- improve documentation and onboarding
- report bugs and clarify rough edges in the developer setup

### Good contribution examples

Smaller contributions:

- clean up a single UI behavior
- improve a protocol type
- fix a message mismatch
- improve a loading state
- clarify setup documentation
- add a focused test

Larger contributions:

- wire a full settings persistence path
- build a real Ollama service layer
- improve routing architecture
- design a cleaner status/error pipeline
- prepare the codebase for future local knowledge retrieval support

### Contribution expectations

Helpful contributions usually share a few traits:

- small, focused pull requests are easier to review
- explain the problem clearly before proposing a large architectural change
- if you change UX, include notes or screenshots when relevant
- if you change message flow, explain the protocol impact
- if you touch early-stage code, expect follow-up iteration

If you are unsure where to start, opening an issue or discussion with a concrete proposal is already a meaningful contribution.

## How You Can Help Right Now

If you want a practical starting point, these are especially valuable right now:

- improve `messageRouter` structure and safety
- improve protocol typing between the extension and webview
- help connect settings to persistent storage
- help wire real Ollama requests
- improve status handling and state synchronization
- improve error flow and failure reporting
- help organize extension services more cleanly
- improve developer experience for local setup and debugging
- refine current UI behavior and interaction details
- add tests for message routing and extension activation
- improve documentation for contributors and first-time testers

## Roadmap

### Foundation

- [x] Basic VS Code extension scaffold
- [x] Sidebar/webview shell
- [x] Settings UI foundation
- [x] Initial protocol and router structure
- [x] Early extension/webview communication flow
- [ ] Harden message contracts and runtime validation
- [ ] Improve service organization

### Local AI Integration

- [ ] Real Ollama connectivity
- [ ] Real chat request flow
- [ ] Model selection flow
- [ ] Connection testing flow
- [ ] Better local runtime diagnostics

### Persistence and UX

- [ ] Persist settings
- [ ] Improve chat state management
- [ ] Add better loading states
- [ ] Add clearer error states
- [ ] Support response streaming

### Context and Knowledge

- [ ] Improve code-aware assistance
- [ ] Add local knowledge retrieval direction
- [ ] Explore offline RAG-style knowledge workflows
- [ ] Improve context assembly for local assistance

### Open-Source Readiness

- [ ] Strengthen tests
- [ ] Improve contributor onboarding
- [ ] Improve repository documentation
- [ ] Clarify release and issue workflow
- [ ] Prepare the project for broader community iteration

## Built in Public

DevLocal AI is being built in public.

That means the repository is expected to evolve openly, including:

- rough edges being discovered in real time
- architecture being refined through collaboration
- progress updates being shared publicly
- community contributions shaping the project direction

Early contributors are especially valuable in a project like this because they do not just fix bugs, they help define how the project grows.

## Development Stage Note

This repository is not presented as a finished local AI product yet.

At the moment, DevLocal AI is best understood as:

- a serious early-stage extension project
- a clear local-first product direction
- a UI and architecture foundation already in place
- an open invitation for contributors to help finish and harden the system

What is already visible is promising. What matters now is turning that foundation into a reliable, well-structured local assistant workflow.

## License

The intended license for the first serious public open-source release is the MIT License.

If you publish the repository publicly, make sure the root license file and package metadata are aligned with that decision before tagging a release.

## Author

DevLocal AI was built and is maintained by Luis.

The project is being developed openly with the goal of evolving into a meaningful, privacy-friendly, local-first AI assistant for VS Code with community collaboration over time.

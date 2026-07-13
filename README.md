# Telman

A telegram messaging toolkit for agents, CLIs, and MCP. Send messages from anywhere — terminal, AI agent, or MCP client.

## Use cases

- **Agent works while you sleep.** Assign a task before bed, the agent completes it and sends you a morning summary with status, PR links, and results.
- **Step away from your desk.** The agent finishes the job and notifies you on Telegram with everything you need.

## What's included

- **CLI** (`@telmanorg/telman`): send messages from the terminal, pipe output, use in scripts.
- **Local MCP** (`@telmanorg/mcp`): stdio MCP server for AI coding tools like OpenCode, Claude Code, and Cursor.
- **Remote MCP** (`telman-remote-mcp`): HTTP MCP server deployable to Vercel for remote access.

## For humans (CLI)

Install:

```sh
npm install -g @telmanorg/telman
```

Configure your bot token and chat ID:

```sh
telman init --telegram-bot-token <token> --telegram-chat-id <chatId>
```

Send a message:

```sh
telman telegram "Hello from the terminal!"
```

## For agents (Skill)

Install the telman skill for any skills-compatible coding agent:

```sh
npx skills add https://github.com/ubeyidah/telman/tree/main/skills/telman
```

## Model Context Protocol

### Local MCP

Configure telman as a local MCP tool in your coding tool of choice.

**OpenCode** (`opencode.json`):

```json
{
  "mcp": {
    "telman": {
      "type": "local",
      "command": ["npx", "-y", "run", "@telmanorg/mcp"],
      "environment": {
        "TELEGRAM_BOT_TOKEN": "",
        "TELEGRAM_CHAT_ID": ""
      }
    }
  }
}
```

**Claude Code** (`.mcp.json`):

```json
{
  "mcpServers": {
    "telman": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "run", "@telmanorg/mcp"],
      "env": {
        "TELEGRAM_BOT_TOKEN": "",
        "TELEGRAM_CHAT_ID": ""
      }
    }
  }
}
```

**Cursor** (`.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "telman": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "run", "@telmanorg/mcp"],
      "env": {
        "TELEGRAM_BOT_TOKEN": "",
        "TELEGRAM_CHAT_ID": ""
      }
    }
  }
}
```

Fill in your `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in the environment variables.

### Remote MCP

Deploy the remote MCP server to Vercel for HTTP-based access:

```sh
cd apps/remote-mcp
vercel deploy
```

Endpoint: `POST /:botToken/:chatId/mcp`

See [`apps/remote-mcp`](./apps/remote-mcp) for details.

## Development

```sh
git clone https://github.com/ubeyidah/telman.git
cd telman
bun install
bun run build:all
```

| Command | Description |
|---|---|
| `bun run build:all` | Build all packages |
| `bun run dev:cli` | Run CLI in dev mode |
| `bun run dev:local-mcp` | Run local MCP in dev mode |
| `bun run dev:remote-mcp` | Run remote MCP in dev mode |
| `bun run lint` | Lint |
| `bun run format` | Format code |
| `bun run type-check` | Type check |

This is a [Bun workspace](https://bun.sh/docs/install/workspaces) monorepo using [Turborepo](https://turbo.build) for task orchestration.

## License

MIT

# telman

Telegram messaging toolkit for agents, CLIs, and MCP.

Send Telegram messages from anywhere — terminal, AI agent, or MCP client.

## Packages

| Package | Description |
|---|---|
| [`@telmanorg/core`](./packages/core) | Zod schemas + Telegram Bot API client |
| [`@telmanorg/telman`](./packages/cli) | CLI tool for sending messages |
| [`@telmanorg/mcp`](./packages/local-mcp) | Local stdio MCP server |
| [`telman-remote-mcp`](./apps/remote-mcp) | Remote HTTP MCP server (Vercel) |

## Quick Start

```sh
git clone https://github.com/ubeyidah/telman.git
cd telman
bun install
bun run build:all
```

## CLI

```sh
# Configure once
telman init --telegram-bot-token <token> --telegram-chat-id <chatId>

# Send a message
telman telegram "Hello from telman!"
```

## Configuration

telman supports config sources:

`telman init` → `~/.config/telman/config.json` 

## Local MCP

Run a local stdio MCP server that exposes the `telegram` tool.

### OpenCode (`opencode.json`)

```json
{
  "mcp": {
    "telman": {
      "type": "local",
      "command": ["bun", "x", "-y", "run", "@telmanorg/mcp"],
      "environment": {
        "TELEGRAM_BOT_TOKEN": "",
        "TELEGRAM_CHAT_ID": ""
      }
    }
  }
}
```

### Claude code (`.mcp.json`)

```json
{
  "mcpServers": {
    "telman": {
      "type": "stdio",
      "command": "bun",
      "args": ["x", "-y", "run", "@telmanorg/mcp"],
      "env": {
        "TELEGRAM_BOT_TOKEN": "",
        "TELEGRAM_CHAT_ID": ""
      }
    }
  }
}
```

## Remote MCP

Deploy the remote MCP server to Vercel for HTTP-based access.

```sh
cd apps/remote-mcp
vercel deploy
```

Endpoint: `POST /:botToken/:chatId/mcp`

See [`apps/remote-mcp`](./apps/remote-mcp) for details.

## Development

```sh
bun run build:all    # build all packages
bun run dev:cli      # run CLI in dev mode
bun run dev:local-mcp # run local MCP in dev mode
bun run dev:remote-mcp # run remote MCP in dev mode
bun run lint         # lint
bun run format       # format code
bun run type-check   # type check
```

## Monorepo

This is a [Bun workspace](https://bun.sh/docs/install/workspaces) monorepo using [Turborepo](https://turbo.build) for task orchestration.

```
telman/
├── apps/
│   └── remote-mcp/     # Remote MCP (Hono, Vercel)
├── packages/
│   ├── core/           # Core library (schemas, API client)
│   ├── cli/            # CLI tool (commander)
│   └── local-mcp/      # Local MCP server (stdio)
└── package.json
```

## License

MIT

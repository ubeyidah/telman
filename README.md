# telman

Telegram messaging toolkit for agents, CLIs, and MCP.

telman lets you send Telegram messages from anywhere — the command line, AI agents (via MCP), or programmatically via a simple API.

## Packages

| Package | Description |
|---|---|
| [`@telmanorg/core`](packages/core) | Zod schemas + Telegram Bot API client |
| [`@telmanorg/telman`](packages/cli) | CLI tool (`telman telegram <message>`) |
| [`@telmanorg/mcp`](packages/local-mcp) | Local MCP server (stdio transport) |
| [`telman-remote-mcp`](apps/remote-mcp) | Remote MCP server (HTTP, deployable to Vercel) |

## Quick start

```bash
git clone https://github.com/ubeyidah/telman.git
cd telman
bun install
bun run build:all
```

## CLI

```bash
# configure once
telman init --telegram-bot-token $TOKEN --telegram-chat-id $CHAT_ID

# send messages
telman telegram "Hello from telman!"
```

## Local MCP

Add to your MCP client config (`.mcp.json` or `opencode.json`):

```json
{
  "mcpServers": {
    "telman": {
      "type": "stdio",
      "command": "bun",
      "args": ["run", "dev:local-mcp"],
      "env": {
        "TELEGRAM_BOT_TOKEN": "",
        "TELEGRAM_CHAT_ID": ""
      }
    }
  }
}
```

## Remote MCP

Deploy to Vercel, then point your MCP client to the endpoint:

```
POST /:botToken/:chatId/mcp
```

```json
{
  "mcpServers": {
    "telman-remote": {
      "type": "http",
      "url": "https://your-app.vercel.app/BOT_TOKEN/CHAT_ID/mcp"
    }
  }
}
```

## Configuration

telman reads credentials from environment variables or a local config file.

| Setting | Source |
|---|---|
| Bot token | `TELEGRAM_BOT_TOKEN` env var |
| Chat ID | `TELEGRAM_CHAT_ID` env var |
| CLI config | `~/.config/telman/config.json` (set via `telman init`) |

## Development

```bash
# build all packages
bun run build:all

# run a single package in dev
bun run dev:cli
bun run dev:local-mcp
bun run dev:remote-mcp

# format & lint
bun run format
bun run lint
```

## License

MIT

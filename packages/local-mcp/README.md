# @telmanorg/mcp

Stdio-based MCP server that exposes a `telegram` tool for sending messages via Telegram.

## Install

```bash
bun add -g @telmanorg/mcp
```

## Configuration

Set these environment variables:

| Variable | Description |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Your Telegram bot token |
| `TELEGRAM_CHAT_ID` | Target chat or channel ID |

## Usage with MCP clients

### OpenCode

Add to `opencode.json`:

```json
{
  "mcp": {
    "telman": {
      "type": "local",
      "command": ["bun", "run", "dev:local-mcp"],
      "enabled": true,
      "environment": {
        "TELEGRAM_BOT_TOKEN": "",
        "TELEGRAM_CHAT_ID": ""
      }
    }
  }
}
```

### Generic editor / IDE

Add to `.mcp.json`:

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

Or point directly at the installed binary:

```json
{
  "mcpServers": {
    "telman": {
      "type": "stdio",
      "command": "telman-mcp",
      "env": {
        "TELEGRAM_BOT_TOKEN": "",
        "TELEGRAM_CHAT_ID": ""
      }
    }
  }
}
```

## Tool

### `telegram`

Sends a text message to the configured Telegram chat.

**Input:** `{ message: string }`

**Output:** Confirmation with `messageId` and `chatId`.

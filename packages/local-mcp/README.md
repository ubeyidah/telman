# @telmanorg/mcp

Stdio-based [MCP](https://modelcontextprotocol.io) server that exposes a `telegram` tool for sending messages.

## Install

```sh
bun add -g @telmanorg/mcp
```

## Configuration

Set these environment variables:

```sh
TELEGRAM_BOT_TOKEN="your-bot-token"
TELEGRAM_CHAT_ID="your-chat-id"
```

Or run with inline env:

```sh
TELEGRAM_BOT_TOKEN="..." TELEGRAM_CHAT_ID="..." telman-mcp
```

## Integration


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



## Tool: `telegram`

| Parameter | Type | Description |
|---|---|---|
| `message` | `string` | Message text to send |

Returns the message ID and chat ID on success.

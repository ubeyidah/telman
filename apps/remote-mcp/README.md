# telman-remote-mcp

HTTP-based remote MCP server for Telegram. Deployable to Vercel.

Built with [Hono](https://hono.dev) and the [MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk).

## Deploy to Vercel

```sh
vercel deploy
```

The `vercel.json` is already configured — no build setup needed.

## Endpoint

```
POST /:botToken/:chatId/mcp
```

The bot token and chat ID are passed as URL path parameters. Each request creates a fresh MCP server instance, registers the `telegram` tool, and handles the session via Streamable HTTP transport.

### Example

```
curl -X POST "https://your-app.vercel.app/123:abc/123456/mcp" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "telegram",
      "arguments": { "message": "Hello from remote MCP!" }
    },
    "id": 1
  }'
```

## Usage with MCP clients

Point your MCP client to the remote URL using SSE or Streamable HTTP transport.

> **Note:** Bot token and chat ID are part of the URL path. Keep the URL private or use appropriate access controls (e.g. Vercel deployment protection, auth proxy).

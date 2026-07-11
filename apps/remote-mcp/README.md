# telman-remote-mcp

HTTP-based remote MCP server for Telegram. Deploy to Vercel and connect from any MCP client over the internet.

## How it works

A [Hono](https://honojs.dev/) server that creates a per-request MCP server using `@modelcontextprotocol/sdk` with Streamable HTTP transport. The bot token and chat ID are passed as URL path parameters so each client can use its own credentials.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ubeyidah/telman)

Or manually:

```bash
vercel deploy
```

The `vercel.json` is already configured — just connect your GitHub repo.

## Usage

### Endpoint

```
POST /:botToken/:chatId/mcp
```

### With MCP clients

Point your MCP client to the deployed URL with Streamable HTTP or SSE transport:

```json
{
  "mcpServers": {
    "telman-remote": {
      "type": "http",
      "url": "https://your-app.vercel.app/YOUR_BOT_TOKEN/YOUR_CHAT_ID/mcp"
    }
  }
}
```

> **Security note:** The bot token and chat ID are part of the URL path. Treat the URL as sensitive — anyone with the URL can send messages using your bot.

### Tool

**`telegram`** — Send a message to the configured Telegram chat.

Input: `{ message: string }`

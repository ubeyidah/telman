#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { messageInputSchema, sendTelegramMessage } from "@telmanorg/core";

const server = new McpServer({
  name: "telman-local",
  version: "0.0.0",
});

function getTelegramBotToken() {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN environment variable is not set");
  }

  return token;
}

server.registerTool(
  "telegram",
  {
    title: "Telegram",
    description: "send messages to a telegram bot",
    inputSchema: messageInputSchema.shape,
  },
  async (input) => {
    const botToken = getTelegramBotToken();
    const result = await sendTelegramMessage({ ...input, botToken });

    return {
      content: [
        {
          type: "text",
          text: `Message sent to Telegram bot: ${result.messageId} to chat ${result.chatId}`,
        },
      ],
      structuredContent: result,
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);

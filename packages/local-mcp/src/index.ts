#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { messageInputSchema, sendTelegramMessage } from "@telmanorg/core";
import pkg from "../package.json" with { type: "json" };

const server = new McpServer({
  name: "telman-local",
  version: pkg.version,
});

function getTelegramBotToken() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN environment variable is not set");
  }

  if (!chatId) {
    throw new Error("TELEGRAM_CHAT_ID environment variable is not set");
  }
  return {
    token,
    chatId,
  };
}

server.registerTool(
  "telegram",
  {
    title: "Telegram",
    description: "send messages to a telegram bot",
    inputSchema: messageInputSchema.pick({ message: true }).shape,
  },
  async ({ message }) => {
    const { token, chatId } = getTelegramBotToken();
    const result = await sendTelegramMessage({ message, botToken: token, chatId });

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

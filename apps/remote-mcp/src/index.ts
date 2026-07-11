import { Hono } from "hono";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { messageInputSchema, sendTelegramMessage } from "@telmanorg/core";

function createServer({ botToken, chatId }: { botToken: string; chatId: string }) {
  const server = new McpServer({
    name: "telman-local",
    version: "0.0.0",
  });
  server.registerTool(
    "telegram",
    {
      title: "Telegram",
      description: "send messages to a telegram bot",
      inputSchema: messageInputSchema.pick({message: true}).shape,
    },
    async ({message}) => {
      const result = await sendTelegramMessage({ message, botToken , chatId});

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

  return server;
}

const app = new Hono();

app.post("/:botToken/:chatId/mcp", async (c) => {
  const botToken = c.req.param("botToken");
  const chatId = c.req.param("chatId");
  const server = createServer({ botToken, chatId });

  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  server.connect(transport);

  try {
    return await transport.handleRequest(c.req.raw);
  } finally {
    await server.close();
  }
});

app.notFound((c) => c.json({ error: "Not Found" }, 404));

export default app;

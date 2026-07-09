import { Command } from "commander";
import { sendTelegramMessage } from "telman-core";

const program = new Command();

program
  .name("telman")
  .description("A CLI tool for sending telegram message")
  .version("0.0.0")
  .command("telegram")
  .description("send a telegram message")
  .argument("<chatId>", "Telegram chat id")
  .argument("<message>", "Message text to send")
  .action(async (chatId: string, message: string) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
      console.error("TELEGRAM_BOT_TOKEN is not set in environment variables");
      process.exit(1);
    }

    if (!chatId) {
      console.error("Chat ID is required");
      process.exit(1);
    }

    if (!message) {
      console.error("Message text is required");
      process.exit(1);
    }

    try {
      const result = await sendTelegramMessage({
        botToken: token,
        chatId,
        message,
      });
      console.log(`Sent Telegram message to chat ${result.chatId}`);
      console.log(`Telegram message ID: ${result.messageId}`);
    } catch (error) {
      const detial = error instanceof Error ? error.message : String(error);
      console.error(`Failed to send message: ${detial}`);
      process.exit(1);
    }
  });

program.parseAsync(process.argv);

import { Command } from "commander";

type TelegramResponse = {
  ok: boolean;
  result?: {
    message_id?: number;
  };
  description?: string;
};

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

    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      },
    );

    const data = (await res.json()) as TelegramResponse;

    if (!res.ok || !data.ok) {
      const detail = data.description || res.statusText;
      console.error(`Failed to send message: ${detail}`);
      process.exit(1);
    }

    const messageId = data.result?.message_id;

    console.log(`Sent Telegram message to chat ${chatId}`);

    if (messageId !== undefined) {
      console.log(`Telegram message ID: ${messageId}`);
    }
  });

program.parseAsync(process.argv);

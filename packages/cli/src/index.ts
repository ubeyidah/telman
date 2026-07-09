import { Command } from "commander";

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
    console.log("hello world", chatId, message);
  });

program.parseAsync(process.argv);

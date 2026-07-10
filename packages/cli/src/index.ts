import { Command } from "commander";
import { sendTelegramMessage } from "telman-core";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { z } from "zod";

const program = new Command();
const configPath = join(homedir(), ".config", "telman", "config.json");
const cliConfigSchema = z.object({
  telegramBotToken: z.string().min(1, "Telegram bot token is required"),
});

function writeTelegramBotToken(token: string) {
  mkdirSync(dirname(configPath), { recursive: true });

  writeFileSync(configPath, JSON.stringify({ telegramBotToken: token }, null, 2), {
    encoding: "utf-8",
    mode: "0o600",
  });
}

function getTelegramBotToken() {
  if (!existsSync(configPath)) {
    throw new Error("Telegram bot token is not set. Please run 'telman init' to set it.");
  }
  const config = cliConfigSchema.parse(JSON.parse(readFileSync(configPath, "utf-8")));
  return config.telegramBotToken;
}

program.name("telman").description("A CLI tool for sending telegram message").version("0.0.0");

program
  .command("init")
  .description("Configure telman ClI local settings")
  .requiredOption("--telegram-bot-token <botToken>", "Telegram bot token")
  .action(async (options: { telegramBotToken: string }) => {
    writeTelegramBotToken(options.telegramBotToken);
    console.log("Telegram bot token saved successfully.");
  });

program
  .command("telegram")
  .description("send a telegram message")
  .argument("<chatId>", "Telegram chat id")
  .argument("<message>", "Message text to send")
  .action(async (chatId: string, message: string) => {
    const token = getTelegramBotToken();

    const result = await sendTelegramMessage({
      botToken: token,
      chatId,
      message,
    });
    console.log(JSON.stringify(result));
  });

program.parseAsync(process.argv).catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});

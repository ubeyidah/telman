import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { z } from "zod";
const configPath = join(homedir(), ".config", "telman", "config.json");
const cliConfigSchema = z.object({
  telegramBotToken: z.string().min(1, "Telegram bot token is required"),
  telegramChatId: z.string().min(1, "Telegram chat id is required"),
});

export function writeTelegramBotToken({ token, chatId }: { token: string; chatId: string }) {
  mkdirSync(dirname(configPath), { recursive: true });

  writeFileSync(
    configPath,
    JSON.stringify({ telegramBotToken: token, telegramChatId: chatId }, null, 2),
    {
      encoding: "utf-8",
      mode: 0o600,
    },
  );
}

export function getTelegramBotToken() {
  if (!existsSync(configPath)) {
    throw new Error(
      "Telegram bot token and chatId is not set. Please run 'telman init' to set it.",
    );
  }
  const config = cliConfigSchema.parse(JSON.parse(readFileSync(configPath, "utf-8")));
  return config;
}

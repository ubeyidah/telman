#!/usr/bin/env node
import { Command } from "commander";
import { sendTelegramMessage } from "@telmanorg/core";
import { getTelegramBotToken, writeTelegramBotToken } from "./config";

const program = new Command();
program.name("telman").description("A CLI tool for sending telegram message").version("0.0.0");

program
  .command("init")
  .description("Configure telman ClI local settings")
  .requiredOption("--telegram-bot-token <botToken>", "Telegram bot token")
  .requiredOption("--telegram-chat-id <chatId>", "Telegram chatId")
  .action(async (options: { telegramBotToken: string; telegramChatId: string }) => {
    writeTelegramBotToken({ token: options.telegramBotToken, chatId: options.telegramChatId });
    console.log("Telegram bot config saved successfully.");
  });

program
  .command("telegram")
  .description("send a telegram message")
  .argument("<message>", "Message text to send")
  .action(async (message: string) => {
    const { telegramBotToken: token, telegramChatId: chatId } = getTelegramBotToken();

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

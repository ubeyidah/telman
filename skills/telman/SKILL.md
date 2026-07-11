---
name: telman
description: Send Telegram messages from agents via the telman toolset. Use this skill whenever a user asks to send a Telegram message, notify someone on Telegram, post an update to a Telegram chat, or use any telman-related commands. Also triggers for "send a message to my Telegram", "ping me on Telegram", "telegram notification", "telman send", "telegram alert", "notify on Telegram", "send telegram", or any request involving Telegram messaging through the agent. If the user mentions telman, Telegram bot, or sending chat messages, make sure to use this skill.
---

# telman — Telegram messaging for agents

telman sends Telegram messages from the agent to a specified chat. It supports two modes:

## Mode 1: MCP tool (preferred)

Use the `telman_telegram` MCP tool directly. It reads the bot token and chat ID from configured environment variables and sends the message in one call.

The tool accepts:
- `message` — the message text to send (string, required)

If the tool is not available, fall back to the CLI.

## Mode 2: CLI

Run the installed `telman` command:

```bash
telman telegram <message>
```

This requires the bot token and chat ID to be configured first:

```bash
telman init --telegram-bot-token <token> --telegram-chat-id <chatId>
```

The config is stored in `~/.config/telman/config.json`.

## Configuration

The bot token and chat ID come from one of:

| Setting        | Source                                | Used by  |
| -------------- | ------------------------------------- | -------- |
| Bot token      | `TELEGRAM_BOT_TOKEN` env var          | MCP tool |
| Bot token      | `telman init --telegram-bot-token`    | CLI      |
| Chat ID        | `TELEGRAM_CHAT_ID` env var            | MCP tool |
| Chat ID        | `telman init --telegram-chat-id`      | CLI      |

If the user hasn't configured these yet, guide them to choose one method and set up both the bot token and chat ID.

## Workflow

1. **Check if MCP tool is available** — try calling `telman_telegram` with the user's `message`.
2. **If MCP tool is not available**, use the CLI instead.
3. **If neither works**, tell the user they need to configure a bot token and chat ID first and show them the relevant setup command.

## Finding a chat ID

If the user doesn't know their Telegram chat ID:

- Tell them to message `@userinfobot` on Telegram to get their ID.
- For group chats, add `@getidsbot` to the group.

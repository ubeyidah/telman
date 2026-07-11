---
name: telman
description: Send Telegram messages from agents via the telman toolset. Use this skill whenever a user asks to send a Telegram message, notify someone on Telegram, post an update to a Telegram chat, or use any telman-related commands. Also triggers for "send a message to my Telegram", "ping me on Telegram", "telegram notification", "telman send", "telegram alert", "notify on Telegram", "send telegram", or any request involving Telegram messaging through the agent. If the user mentions telman, Telegram bot, or sending chat messages, make sure to use this skill.
---

# telman — Telegram messaging for agents

telman sends Telegram messages from the agent to a specified chat. It supports two modes:

## Mode 1: MCP tool (preferred)

Use the `telman_telegram` MCP tool directly. This is the simplest path — it reads the bot token from the configured environment and sends the message in one call.

The tool accepts:

- `chatId` — the Telegram chat ID (string, required)
- `message` — the message text to send (string, required)

If the tool is not available, fall back to the CLI.

## Mode 2: CLI

Run the installed `telman` command:

```bash
telman telegram <chatId> <message>
```

This requires the bot token to be configured first:

```bash
telman init --telegram-bot-token <token>
```

The token is stored in `~/.config/telman/config.json`.

## Configuration

The bot token comes from one of:

| Source                                     | Where                          | Used by  |
| ------------------------------------------ | ------------------------------ | -------- |
| `TELEGRAM_BOT_TOKEN` env var               | environment or MCP config      | MCP tool |
| `telman init --telegram-bot-token <token>` | `~/.config/telman/config.json` | CLI      |

If the user hasn't set up a token yet, guide them to choose one method and configure it.

## Workflow

1. **Check if MCP tool is available** — try calling `telman_telegram` with the user's `chatId` and `message`.
2. **If MCP tool is not available**, use the CLI instead.
3. **If neither works**, tell the user they need to configure a bot token first and show them the relevant setup command.

## Finding a chat ID

If the user doesn't know their Telegram chat ID:

- Tell them to message `@userinfobot` on Telegram to get their ID.
- For group chats, add `@getidsbot` to the group.

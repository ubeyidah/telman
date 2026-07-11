# @telmanorg/telman

CLI tool for sending Telegram messages from the terminal.

## Install

```sh
bun add -g @telmanorg/telman
```

## Commands

### `telman init`

Store your bot token and chat ID locally.

```sh
telman init --telegram-bot-token <token> --telegram-chat-id <chatId>
```

Config is saved to `~/.config/telman/config.json` with restricted permissions (`0o600`).

### `telman telegram <message>`

Send a Telegram message using saved credentials.

```sh
telman telegram "Hello from the terminal!"
```

## Configuration

| Option | Env var | Config file |
|---|---|---|
| Bot token | `TELEGRAM_BOT_TOKEN` | `~/.config/telman/config.json` (`telegramBotToken`) |
| Chat ID | `TELEGRAM_CHAT_ID` | `~/.config/telman/config.json` (`telegramChatId`) |

If not configured, run `telman init` first.

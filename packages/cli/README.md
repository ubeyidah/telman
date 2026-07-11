# @telmanorg/telman

CLI tool for sending Telegram messages from the command line.

## Install

```bash
bun add -g @telmanorg/telman
```

## Usage

### Configure

```bash
telman init --telegram-bot-token YOUR_TOKEN --telegram-chat-id YOUR_CHAT_ID
```

Config is stored in `~/.config/telman/config.json`.

### Send a message

```bash
telman telegram "Hello from telman!"
```

### One-liner

```bash
telman init --telegram-bot-token $TOKEN --telegram-chat-id $CHAT_ID && telman telegram "Hello!"
```

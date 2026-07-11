# @telmanorg/core

Core library for telman — Zod schemas and a Telegram Bot API client.

## Install

```bash
bun add @telmanorg/core
```

## API

### `sendTelegramMessage(options)`

Sends a text message via the Telegram Bot API.

```ts
import { sendTelegramMessage } from "@telmanorg/core";

const result = await sendTelegramMessage({
  botToken: "YOUR_BOT_TOKEN",
  chatId: "123456789",
  message: "Hello from telman!",
});
// => { ok: true, chatId: "123456789", messageId: 42 }
```

### Schemas

| Export | Description |
|---|---|
| `messageInputSchema` | `{ chatId, message }` |
| `messageOptionsSchema` | `{ chatId, message, botToken }` |
| `sendMessageReqSchema` | Telegram API request body |
| `sendMessageResSchema` | Telegram API response body |
| `messageOutputSchema` | Normalized success response |

### Types

| Export | Shape |
|---|---|
| `MessageInput` | `{ chatId: string; message: string }` |
| `MessageOptions` | `{ chatId: string; message: string; botToken: string }` |
| `MessageOutput` | `{ ok: true; chatId: string; messageId: number }` |

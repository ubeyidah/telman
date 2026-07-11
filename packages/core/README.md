# @telmanorg/core

Core library for telman — Zod schemas and a Telegram Bot API client.

## Install

```sh
bun add @telmanorg/core
```

## API

### `sendTelegramMessage(options)`

Sends a message via the Telegram Bot API.

```ts
import { sendTelegramMessage } from "@telmanorg/core";

const result = await sendTelegramMessage({
  botToken: "123:abc",
  chatId: "123456",
  message: "Hello from telman!",
});

console.log(result); // { ok: true, chatId: "123456", messageId: 42 }
```

### Schemas

All Zod schemas are exported:

| Schema | Description |
|---|---|
| `messageInputSchema` | `{ chatId, message }` |
| `messageOptionsSchema` | `{ chatId, message, botToken }` |
| `sendMessageReqSchema` | Telegram API request body `{ chat_id, text }` |
| `sendMessageResSchema` | Telegram API response `{ ok, result?, description? }` |
| `messageOutputSchema` | Success output `{ ok: true, chatId, messageId }` |

### Types

- `MessageInput` — `{ chatId: string, message: string }`
- `MessageOptions` — `{ chatId: string, message: string, botToken: string }`
- `MessageOutput` — `{ ok: true, chatId: string, messageId: number }`

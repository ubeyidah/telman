import {
  messageOptionsSchema,
  type MessageOutput,
  messageOutputSchema,
  sendMessageReqSchema,
  sendMessageResSchema,
  type MessageOptions,
} from "./schema";

export async function sendTelegramMessage(
  input: MessageOptions,
): Promise<MessageOutput> {
  const parsedInput = messageOptionsSchema.parse(input);

  const requestBody = sendMessageReqSchema.parse({
    chat_id: parsedInput.chatId,
    text: parsedInput.message,
  });

  const res = await fetch(
    `https://api.telegram.org/bot${parsedInput.botToken}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    },
  );

  const data = sendMessageResSchema.parse(await res.json());

  if (!res.ok || !data.ok || !data.result) {
    throw new Error(data.description || "Failed to send message");
  }

  return messageOutputSchema.parse({
    ok: true,
    chatId: parsedInput.chatId,
    messageId: data.result.message_id,
  });
}

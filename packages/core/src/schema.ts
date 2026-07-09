import { z } from "zod";

export const messageInputSchema = z.object({
  chatId: z.string().min(1, "chatId is required"),
  message: z.string().min(1, "message is required"),
});

export const messageOptionsSchema = messageInputSchema.extend({
  botToken: z.string().min(1, "botToken is required"),
});

export const sendMessageReqSchema = z.object({
  chat_id: z.string().min(1, "chat_id is required"),
  text: z.string().min(1, "text is required"),
});

export const sendMessageResSchema = z.object({
  ok: z.boolean(),
  result: z
    .object({
      message_id: z.number(),
    })
    .optional(),
  description: z.string().optional(),
});

export const messageOutputSchema = z.object({
  ok: z.literal(true),
  chatId: z.string(),
  messageId: z.number(),
});

export type MessageInput = z.infer<typeof messageInputSchema>;
export type MessageOptions = z.infer<typeof messageOptionsSchema>;
export type MessageOutput = z.infer<typeof messageOutputSchema>;

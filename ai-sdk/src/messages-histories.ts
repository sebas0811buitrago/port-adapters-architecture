import { generateText, type ModelMessage } from "ai";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { once } from "node:events";
import { createAnthropic } from "@ai-sdk/anthropic";
import { anthropicModel } from "./models";

//example

// const messages: ModelMessage[] = [
//   {
//     role: "user",
//     content: "Hello, you!",
//   },
//   {
//     role: "system",
//     content: "Hi user",
//   },
// ];

export const startServer = async () => {
  const app = new Hono();
  app.post("/api/get-completions", async (ctx) => {
    const messages: ModelMessage[] = await ctx.req.json();

    const result = await generateText({
      model: anthropicModel,
      messages,
    });

    return ctx.json(result.response.messages);
  });

  const server = serve({
    fetch: app.fetch,
    port: 4317,
    hostname: "0.0.0.0",
  });

  await once(server, "listening");

  return server;
};

const messagesToSend: ModelMessage[] = [
  {
    role: "user",
    content: "What's the capital of Wales?",
  },
];

// curl -X POST http://localhost:3000/api/get-completions \
//   -H "Content-Type: application/json" \
//   -d '[
//     {
//       "role": "user",
//       "content": "Hello, how are you today?"
//     }
//   ]'

async function main() {
  await startServer();

  const response = await fetch("http://localhost:4317/api/get-completions", {
    method: "POST",
    body: JSON.stringify(messagesToSend),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const newMessages = (await response.json()) as ModelMessage[];

  console.log("newMessages", newMessages);

  const allMessages = [...messagesToSend, ...newMessages];

  console.log(allMessages);
}

main();

import "dotenv/config";

import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText, streamText } from "ai";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY is not set");
}

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const model = anthropic("claude-sonnet-4-20250514");

const answerMyQuestion = async (prompt: string) => {
  // this one waits for all the text to be ready
  //   const { text } = await generateText({
  //     model,
  //     prompt,
  //   });

  const { textStream } = await streamText({
    model,
    prompt,
  });

  for await (const text of textStream) {
    process.stdout.write(text);
  }

  return textStream;
};

const main = async () => {
  const answer = await answerMyQuestion("What is the color of the sun");

  //   console.log(answer);
};

main();

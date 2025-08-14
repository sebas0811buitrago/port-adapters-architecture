import { generateObject } from "ai";
import "dotenv/config";
import { createAnthropic } from "@ai-sdk/anthropic";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY is not set");
}

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const model = anthropic("claude-3-5-sonnet-20241022");

export const classifySentiment = async (text: string) => {
  const { object } = await generateObject({
    model,
    output: "enum",
    enum: ["positive", "negative", "neutral"],
    prompt: text,
    system:
      `Classify the sentiment of the text as either ` +
      `positive, negative, or neutral.`,
  });

  return object;
};

const main = async () => {
  const result = await classifySentiment(`I feel great`);

  console.log(result); // neutral
};

main();

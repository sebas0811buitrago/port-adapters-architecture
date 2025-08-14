import { openai } from "@ai-sdk/openai";
import { generateText, type LanguageModel } from "ai";
import "dotenv/config";

export const ask = async (prompt: string, model: LanguageModel) => {
  const { text } = await generateText({
    model,
    prompt,
  });

  return text;
};

const prompt = `Tell me a story about your grandmother.`;

async function main() {
  const openaiResult = await ask(prompt, openai("gpt-4o-mini-2024-07-18"));
  console.log(openaiResult);
}

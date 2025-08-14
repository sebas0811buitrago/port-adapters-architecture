import { generateObject } from "ai";
import "dotenv/config";

import { anthropicModel } from "./models";

export const classifySentiment = async (text: string) => {
  const { object } = await generateObject({
    model: anthropicModel,
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

import "dotenv/config";

import { streamText } from "ai";
import { anthropicModel } from "./models";

const answerMyQuestion = async (prompt: string) => {
  // this one waits for all the text to be ready
  //   const { text } = await generateText({
  //     model,
  //     prompt,
  //   });

  const { textStream } = await streamText({
    model: anthropicModel,
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

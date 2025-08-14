import { z } from "zod";

import { streamObject } from "ai";

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

const schema = z.object({
  recipe: z.object({
    name: z.string(),
    ingredients: z.array(
      z.object({
        name: z.string(),
        amount: z.string(),
      })
    ),
    steps: z.array(z.string()),
  }),
});

export const createRecipe = async (prompt: string) => {
  //   const { object } = await generateObject({
  //     model: anthropic("claude-sonnet-4-20250514"),
  //     schema,
  //     prompt,
  //     system:
  //       `You are helping a user create a recipe. ` +
  //       `Use British English variants of ingredient names,` +
  //       `like Coriander over Cilantro.`,
  //   } as const);

  const result = await streamObject({
    model,
    system:
      `You are helping a user create a recipe. ` +
      `Use British English variants of ingredient names,` +
      `like Coriander over Cilantro.`,
    schemaName: "Recipe",
    schema,
    prompt,
  });

  for await (const obj of result.partialObjectStream) {
    console.clear();
    console.dir(obj, { depth: null });
  }

  const finalObject = await result.object;

  return finalObject.recipe;
};

async function main() {
  await createRecipe("What is the recipe for spaguethis carbonara");
}

main();

import { z } from "zod";

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

  const { object } = await generateObject({
    model: anthropic("claude-3-5-sonnet-20241022"),
    schema,
    prompt,
    system:
      `You are helping a user create a recipe. ` +
      `Use British English variants of ingredient names,` +
      `like Coriander over Cilantro.`,
    mode: "json",
  });

  console.log(object);
  return object;
};

async function main() {
  createRecipe("What is the recipe for spaguethis carbonara");
}

main();

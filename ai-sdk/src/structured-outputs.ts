import { z } from "zod";

import { generateObject } from "ai";
import { anthropicModel } from "./models";

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
    model: anthropicModel,
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

import { generateObject } from "ai";
import { anthropicModel } from "./models";

import { z } from "zod";

const schema = z.object({
  name: z.string().describe("the name of the user"),
  age: z.number().describe("the user's age"),
  email: z.string().email().describe("The user's email address, @example.com"),
});

export const createFakeUsers = async (input: string) => {
  const { object } = await generateObject({
    model: anthropicModel,
    prompt: input,
    system: "You are generating fake user data",
    output: "array",
    schema,
  });

  return object;
};

const init = async () => {
  const result = await createFakeUsers("generate 5 users from UK");

  console.log("result", result);
};

init();

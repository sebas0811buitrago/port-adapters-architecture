import { createAnthropic } from "@ai-sdk/anthropic";
import { mcpClient, transportClient } from "./client";
import { generateText, jsonSchema, stepCountIs, tool, ToolSet } from "ai";
import { input } from "@inquirer/prompts";
import { Tool } from "@modelcontextprotocol/sdk/types";
import "dotenv/config";
import z from "zod";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY is not set");
}

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const model = anthropic("claude-sonnet-4-20250514");

//  parameters: {
//           type: "object",
//           properties: Object.entries(tool.inputSchema).reduce(
//             (props, [key, schema]) => ({
//               ...props,
//               [key]: {
//                 type:
//                   (schema as any)?._def?.typeName === "ZodNumber"
//                     ? "number"
//                     : "string",
//                 description: `${key} parameter`,
//               },
//             }),
//             {}
//           ),
//           required: Object.keys(tool.inputSchema),
//         }

// tools: tools.reduce((obj, tool) => ({
//   ...obj,
//   [tool.name]: {
//     description: tool.description,
//     inputSchema: z.object({}),

//     execute: async (args: Record<string, any>) => {
//       return await mcpClient.callTool({
//         name: tool.name,
//         arguments: args,
//       });
//     },
//   },
// })),

async function handleQuery(tools: Tool[]) {
  const query = await input({ message: "Enter your query" });

  const { text, toolResults, steps } = await generateText({
    model,
    prompt: query,
    stopWhen: stepCountIs(5),
    tools: {
      bmiCalculator: tool({
        description: "Get BMI",
        inputSchema: jsonSchema({
          type: "object",
          properties: {
            height: { type: "number" },
            weight: { type: "number" },
          },
          required: ["height", "weight"],
          additionalProperties: false,
          $schema: "http://json-schema.org/draft-07/schema#",
        }),
        execute: async ({
          height,
          weight,
        }: {
          height: number;
          weight: number;
        }) => ({
          height,
          weight,
        }),
      }),
    },
  });

  console.dir(steps[0]?.toolCalls, {
    depth: 10,
  });

  console.dir(steps[0]?.toolResults, { depth: null });

  console.log(
    // @ts-expect-error
    text || toolResults[0]?.result?.content[0]?.text || "No text generated."
  );
}

async function main() {
  console.log("main");
  await mcpClient.connect(transportClient);

  const [{ tools }] = await Promise.all([mcpClient.listTools()]);

  console.dir(tools, {
    depth: 5,
  });

  await handleQuery(tools);
}

main();

import { createAnthropic } from "@ai-sdk/anthropic";
import { mcpClient, transportClient } from "./client";
import { generateText, ToolSet } from "ai";
import { input } from "@inquirer/prompts";
import { Tool } from "@modelcontextprotocol/sdk/types";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY is not set");
}

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const model = anthropic("claude-sonnet-4-20250514");

async function handleQuery(tools: Tool[]) {
  const query = await input({ message: "Enter your query" });

  const { text, toolResults } = await generateText({
    model,
    prompt: query,
    tools: tools.reduce(
      (obj, tool) => ({
        ...obj,
        [tool.name]: {
          description: tool.description,
          parameters: {
            type: "object",
            properties: Object.entries(tool.inputSchema).reduce(
              (props, [key, schema]) => ({
                ...props,
                [key]: {
                  type:
                    (schema as any)?._def?.typeName === "ZodNumber"
                      ? "number"
                      : "string",
                  description: `${key} parameter`,
                },
              }),
              {}
            ),
            required: Object.keys(tool.inputSchema),
          },
          execute: async (args: Record<string, any>) => {
            return await mcpClient.callTool({
              name: tool.name,
              arguments: args,
            });
          },
        },
      }),
      {} as ToolSet
    ),
  });

  console.log(
    // @ts-expect-error
    text || toolResults[0]?.result?.content[0]?.text || "No text generated."
  );
}

async function main() {
  await mcpClient.connect(transportClient);

  const [{ tools }] = await Promise.all([mcpClient.listTools()]);

  console.log("server", { tools });

  handleQuery(tools);
}

main();

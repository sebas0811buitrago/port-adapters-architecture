import { createAnthropic } from "@ai-sdk/anthropic";
import { mcpClient, transportClient } from "./client";
import { generateText, jsonSchema, stepCountIs, tool, ToolSet } from "ai";
import { input } from "@inquirer/prompts";
import { Tool } from "@modelcontextprotocol/sdk/types";
import "dotenv/config";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY is not set");
}

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const model = anthropic("claude-sonnet-4-20250514");

async function handleQuery(mcpTools: Tool[]) {
  const query = await input({ message: "Enter your query" });

  const { text } = await generateText({
    model,
    prompt: query,
    stopWhen: stepCountIs(5),
    tools: mcpTools.reduce(
      (object, mcpTool) => ({
        ...object,
        [mcpTool?.name]: tool({
          description: mcpTool?.description,
          inputSchema: jsonSchema(mcpTool.inputSchema),
          execute: async (args: Record<string, any>) => {
            return await mcpClient.callTool({
              name: mcpTool?.name,
              arguments: args,
            });
          },
        }),
      }),
      {}
    ),
  });

  console.log(text);
}

async function main() {
  console.log("main");
  await mcpClient.connect(transportClient);

  const [{ tools }] = await Promise.all([mcpClient.listTools()]);

  await handleQuery(tools);
}

main();

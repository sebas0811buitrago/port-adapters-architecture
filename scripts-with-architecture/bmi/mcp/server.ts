import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { bmiWeightCategory, calculateBMI, weightValidation, heightValidation } from "../domain/bmi";
import { createRecord } from "../services/create-record";

// Create an MCP server
const server = new McpServer({
  name: "bmi-calculator",
  version: "1.0.0",
});

// Add an addition tool
server.registerTool(
  "calculate_bmi",
  {
    title: "Calculate Body Mass Index",
    description:
      "Calculate Body mass index using the weight(kg) and height(m) of a person",
    inputSchema: { height: z.number(), weight: z.number() },
  },
  async ({ height, weight }) => {
    const weightValidationResult = weightValidation(weight);
    if (!weightValidationResult.success) {
      return {
        content: [
          { type: "text", text: `Validation Error: ${weightValidationResult.message}` },
        ],
      };
    }

    const heightValidationResult = heightValidation(height);
    if (!heightValidationResult.success) {
      return {
        content: [
          { type: "text", text: `Validation Error: ${heightValidationResult.message}` },
        ],
      };
    }

    const bmi = calculateBMI({ height, weight });

    const category = bmiWeightCategory(bmi);

    const record = await createRecord({
      bmi,
      height,
      weight,
    });

    return {
      content: [
        { type: "text", text: "BMI calculated, and record saved" },
        {
          type: "text",
          text: JSON.stringify({ ...record, category }),
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();

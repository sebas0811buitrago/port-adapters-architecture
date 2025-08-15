import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export const mcpClient = new Client(
  {
    name: "test-client-video",
    version: "1.0.0",
  },
  {
    capabilities: {
      sampling: {},
    },
  }
);

export const transportClient = new StdioClientTransport({
  command: "node",
  args: ["dist/bmi/mcp/server.js"],
  stderr: "ignore",
});

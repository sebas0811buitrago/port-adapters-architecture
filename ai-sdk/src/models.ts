import "dotenv/config";

import { createAnthropic } from "@ai-sdk/anthropic";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY is not set");
}

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const anthropicModel = anthropic("claude-sonnet-4-20250514");

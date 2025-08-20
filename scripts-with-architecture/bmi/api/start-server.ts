import { serve } from "@hono/node-server";
import app from "./server";

const port = 3000;

console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

// CURL Examples to test the endpoints:

// 1. Get all BMI records:
// curl -X GET http://localhost:3000/records

// 2. Create a new BMI record:
// curl -X POST http://localhost:3000/records \
//   -H "Content-Type: application/json" \
//   -d '{"weight": 70, "height": 1.75}'

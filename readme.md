# Project Documentation

## Scripts without Architecture

To search for books:

```bash
cd scripts-without-architecture
npm run search-books
```

## Scripts with Architecture

Navigate to the architecture directory:

```bash
cd scripts-with-architecture
```

### Available Commands

#### Search Books

```bash
npm run search-books
```

#### BMI Application

#### MCP

Build the mcp server

```bash
npm run build
```

mcp config file:

```json
{
  "mcpServers": {
    "mcp-bmi": {
      "type": "stdio",
      "command": "node",
      "args": [
        "<absolute-path>/port-adapters-architecture/scripts-with-architecture/dist/bmi/mcp/server.js"
      ]
    }
  }
}
```

### BMI Calculation Prompt

**Example calculation request:**

Calculate my BMI with this data:

- **Weight:** 200 lb
- **Height:** 5.5 ft

Run the BMI application in the terminal:

```bash
npm run bmi
```

### API Usage

Start the BMI API server:

```bash
npm run bmi:api
```

#### Create a New BMI Record

Use the following curl command to create a new BMI record:

```bash
curl -X POST http://localhost:3000/records \
  -H "Content-Type: application/json" \
  -d '{"weight": 70, "height": 1.75}'
```

---

_Note: The BMI calculator accepts weight in kilograms and height in meters. Conversion may be required for imperial units._

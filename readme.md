# Port-Adapters Architecture Learning Project

This repository demonstrates different architectural approaches in software development, showing the evolution from unstructured code to well-architected, maintainable applications using the Port-Adapters (Hexagonal Architecture) pattern.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Architectural Approaches](#architectural-approaches)
- [Applications](#applications)
- [Quick Start](#quick-start)
- [Detailed Usage](#detailed-usage)

## 🎯 Project Overview

This project contains multiple implementations of the same applications using different architectural patterns:

- **Without Architecture**: Monolithic, tightly-coupled implementations
- **With Architecture**: Clean, maintainable implementations using Port-Adapters pattern
- **Screaming Architecture**: Feature-organized structure that clearly communicates intent

## 🏗️ Architectural Approaches

### 1. Scripts Without Architecture

Basic implementations without separation of concerns, suitable for simple scripts but difficult to maintain and test.

### 2. Scripts With Architecture

Implementations following the Port-Adapters (Hexagonal Architecture) pattern with:

- Clear separation between domain logic and external dependencies
- Testable and maintainable code structure
- Multiple interface implementations (CLI, API, MCP)

### 3. Screaming Architecture

Organization that makes the business purpose immediately apparent from the folder structure.

## 📱 Applications

This project includes several sample applications to demonstrate architectural principles:

### 🔍 Book Search

A simple application that demonstrates searching for books using different architectural approaches.

### 📊 BMI Calculator

A comprehensive BMI calculation application with multiple interfaces:

- **CLI Interface**: Terminal-based interaction
- **API Interface**: RESTful web service
- **MCP Interface**: Model Context Protocol integration

## 🚀 Quick Start

### Book Search Examples

#### Without Architecture

```bash
cd scripts-without-architecture
npm install
npm run search-books
```

#### With Architecture

```bash
cd scripts-with-architecture
npm install
npm run search-books
```

### BMI Calculator

#### CLI Application

```bash
cd scripts-with-architecture
npm install
npm run bmi
```

#### API Server

```bash
cd scripts-with-architecture
npm install
npm run bmi:api
```

## 📖 Detailed Usage

### 🔍 Book Search Application

The book search functionality is available in both architectural approaches:

**Without Architecture:**

- Single file implementation
- All logic mixed together
- Hard to test and maintain

**With Architecture:**

- Separated domain, service, and UI layers
- Easy to swap implementations
- Testable components

### 📊 BMI Calculator Application

The BMI calculator showcases multiple interface implementations of the same business logic:

#### CLI Interface

Interactive terminal application:

```bash
npm run bmi
```

**Example Usage:**

- Input weight: 90.7 kg
- Input height: 1.68 m
- Get BMI calculation and health category

#### API Interface

RESTful web service for BMI calculations:

```bash
npm run bmi:api
```

**Create BMI Record:**

```bash
curl -X POST http://localhost:3000/records \
  -H "Content-Type: application/json" \
  -d '{"weight": 70, "height": 1.75}'
```

**Get All Records:**

```bash
curl http://localhost:3000/records
```

#### MCP (Model Context Protocol) Interface

Integration with AI systems like Claude:

1. **Build the MCP Server:**

   ```bash
   npm run build
   ```

2. **Configure Claude Desktop:**

   Add to your `claude_desktop_config.json`:

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

3. **Usage in Claude:**
   ```
   Calculate my BMI with this data:
   - Weight: 200 lb
   - Height: 5.5 ft
   ```

## 🛠️ Development

### Project Structure

```
port-adapters-architecture/
├── scripts-without-architecture/     # Monolithic implementations
├── scripts-with-architecture/        # Clean architecture implementations
├── complete-architecture-next.js/    # Next.js with clean architecture
├── vanilla-js-with-architecture/     # Pure JS implementation
└── with-screaming-architecture/      # Feature-based organization
```

### Key Architectural Benefits

- **Testability**: Business logic separated from external dependencies
- **Flexibility**: Easy to swap implementations (CLI ↔ API ↔ MCP)
- **Maintainability**: Clear separation of concerns
- **Scalability**: Easy to add new features and interfaces

---

## 📝 Notes

- The BMI calculator accepts weight in kilograms and height in meters
- Imperial unit conversion is handled automatically by the llm host (Claude)
- All applications demonstrate the same business logic with different architectural approaches

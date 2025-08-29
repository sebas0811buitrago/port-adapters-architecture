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

Start the BMI API server:

```bash
npm run bmi:api
```

Run the BMI application:

```bash
npm run bmi
```

### API Usage

#### Create a New BMI Record

Use the following curl command to create a new BMI record:

```bash
curl -X POST http://localhost:3000/records \
  -H "Content-Type: application/json" \
  -d '{"weight": 70, "height": 1.75}'
```

### BMI Calculation Prompt

**Example calculation request:**

Calculate my BMI with this data:

- **Weight:** 200 lb
- **Height:** 5.5 ft

---

_Note: The BMI calculator accepts weight in kilograms and height in meters. Conversion may be required for imperial units._

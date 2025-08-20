import { Hono } from "hono";
import { getAllRecord } from "../services/get-all-records";
import { createRecord } from "../services/create-record";
import {
  calculateBMI,
  weightValidation,
  heightValidation,
  bmiWeightCategory,
} from "../domain/bmi";

const app = new Hono();

// Endpoint to list all BMI records
app.get("/records", async (ctx) => {
  try {
    const records = await getAllRecord();

    const recordsWithCategory = records.map((record) => ({
      ...record,
      category: bmiWeightCategory(record.bmi),
    }));

    return ctx.json({
      success: true,
      data: recordsWithCategory,
    });
  } catch (error) {
    return ctx.json(
      {
        success: false,
        error: "Failed to fetch records",
      },
      500
    );
  }
});

// Endpoint to calculate BMI and save record
app.post("/records", async (ctx) => {
  try {
    const body = await ctx.req.json();
    const { weight, height } = body;

    // Validate weight
    const weightValidationResult = weightValidation(weight);
    if (!weightValidationResult.success) {
      return ctx.json(
        {
          success: false,
          error: weightValidationResult.message,
        },
        400
      );
    }

    // Validate height
    const heightValidationResult = heightValidation(height);
    if (!heightValidationResult.success) {
      return ctx.json(
        {
          success: false,
          error: heightValidationResult.message,
        },
        400
      );
    }

    // Calculate BMI
    const bmi = calculateBMI({ weight, height });
    const category = bmiWeightCategory(bmi);

    // Save record
    const savedRecord = await createRecord({ weight, height, bmi });

    return ctx.json(
      {
        success: true,
        data: {
          ...savedRecord,
          category,
        },
      },
      201
    );
  } catch (error) {
    return ctx.json(
      {
        success: false,
        error: "Failed to create record",
      },
      500
    );
  }
});

// Start the server

export default app;

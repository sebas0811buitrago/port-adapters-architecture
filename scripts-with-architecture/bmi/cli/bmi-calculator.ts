// BMi calculators =>

// CLI applications to calculate and save the bmi o one user
// the cli show option to calculate and save a new bmi or to show previous records

// option 1: create new bmi records :
//       users input their weight  (Kg) (from 1 to 200kg)
//       and height (m) (from 1m to 3m), the script calculate the bmi,
//       show the result and shows the weight category
// option 2: show previous records
//          show id, weight, height, bmi, and category, and timestamp
// BMI = weight (kg) / [height (m)]².

// BMI categories for adults are:
// Underweight (<18.5 kg/m²),
// Normal weight (18.5-24.9 kg/m²),
// Overweight (25-29.9 kg/m²),
// and Obese (30 kg/m² or greater).

import * as readline from "readline";

import { getAllRecord } from "../services/get-all-records";
import {
  bmiWeightCategory,
  calculateBMI,
  heightValidation,
  weightValidation,
} from "../domain/bmi";
import { createRecord } from "../services/create-record";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main(): Promise<void> {
  try {
    console.log("🔍 Welcome to the Book Search CLI!");
    console.log("Chose one of the two option\n");
    console.log("1. Create new bmi records\n");
    console.log("2. Show previous records\n");

    const optionRaw = await askQuestion("Option: ");

    const option = Number(optionRaw);

    if (option === 1) {
      let isWeigthInValid = true;
      let weight = 0;

      while (isWeigthInValid) {
        const weightRaw = await askQuestion("weight (kg): ");

        weight = Number(weightRaw);

        const { message, success } = weightValidation(weight);

        isWeigthInValid = !success;

        if (!success) console.log(`ERROR: ${message}`);
      }

      let isHeightInValid = true;
      let height = 0;

      while (isHeightInValid) {
        const heighttRaw = await askQuestion("height (m): ");

        height = Number(heighttRaw);

        const { message, success } = heightValidation(height);

        isHeightInValid = !success;

        if (!success) console.log(`ERROR: ${message}`);
      }

      const bmi = calculateBMI({
        height,
        weight,
      });

      console.log(
        `\n  BMI : ${bmi}, height ${height}, weight: ${weight}, ${bmiWeightCategory(
          bmi
        )} `
      );

      await createRecord({
        bmi,
        height,
        weight,
      });
      rl.close();
      return;
    }

    if (option === 2) {
      const records = await getAllRecord();

      records.forEach(({ bmi, height, id, weight }) => {
        console.log(
          `\n ${id} : BMI : ${bmi}, height ${height}, weight: ${weight}, ${bmiWeightCategory(
            bmi
          )} `
        );
      });
      rl.close();
      return;
    }

    rl.close();
  } catch (error) {
    console.error("❌ An error occurred:", error);
    rl.close();
  }
}

main();

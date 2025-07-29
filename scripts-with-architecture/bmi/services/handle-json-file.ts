import fs from "fs";
import path from "path";

export interface BMIFileRecord {
  id: string;
  weight: number;
  height: number;
  bmi: number;
  timestamp: string;
}

const RECORDS_FILE_PATH = path.join(__dirname, "bmi-records.json");

/**
 * Generates a unique ID for BMI records
 * @returns string - Unique ID
 */
function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

/**
 * Reads existing BMI records from file
 * @returns BMIFileRecord[] - Array of existing records
 */
function readExistingRecords(): BMIFileRecord[] {
  try {
    if (!fs.existsSync(RECORDS_FILE_PATH)) {
      return [];
    }

    const fileContent = fs.readFileSync(RECORDS_FILE_PATH, "utf-8");
    const data = JSON.parse(fileContent);
    return data;
  } catch (error) {
    console.error("Error reading existing records:", error);
    return [];
  }
}

/**
 * Saves BMI record to file with ID and timestamp
 * @param record - BMI record with weight, height, and bmi
 * @returns BMIFileRecord - Saved record with ID and timestamp
 */
export function saveBMIRecord(record: {
  weight: number;
  height: number;
  bmi: number;
}): BMIFileRecord {
  const existingRecords = readExistingRecords();

  const newRecord: BMIFileRecord = {
    id: generateId(),
    weight: record.weight,
    height: record.height,
    bmi: record.bmi,
    timestamp: new Date().toISOString(),
  };

  const updatedRecords = [...existingRecords, newRecord];

  try {
    // Ensure directory exists
    const dir = path.dirname(RECORDS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write updated records to file
    fs.writeFileSync(
      RECORDS_FILE_PATH,
      JSON.stringify({ records: updatedRecords }, null, 2)
    );

    return newRecord;
  } catch (error) {
    console.error("Error saving BMI record:", error);
    throw new Error("Failed to save BMI record");
  }
}

/**
 * Gets BMI records sorted by timestamp (newest first)
 * @returns BMIFileRecord[] - Array of records sorted by timestamp
 */
export function getAllBMIRecords(): BMIFileRecord[] {
  const records = getAllBMIRecords();
  return records.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

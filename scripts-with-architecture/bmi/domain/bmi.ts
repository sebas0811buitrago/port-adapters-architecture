// BMi calculators =>

// CLI applications to calculate and save the bmi o one user
// the cli show option to calculate and save a new bmi or to show previous records

// option 1: create new bmi records :
//       users input their weight  (Kg) (from 1 to 200kg)
//       and height (m) (from 0.3m to 3m), the script calculate the bmi,
//       show the result and shows the weight category
// option 2: show previous records
//          show id, weight, height, bmi, and category, and timestamp
// BMI = weight (kg) / [height (m)]².

// BMI categories for adults are:
// Underweight (<18.5 kg/m²),
// Normal weight (18.5-24.9 kg/m²),
// Overweight (25-29.9 kg/m²),
// and Obese (30 kg/m² or greater).

// entities =>   Record,

export type BodyMeasurements = {
  weight: number;
  height: number;
};

export type Bmi = number;

export type Record = {
  id: string;
  bmi: Bmi;
} & BodyMeasurements;

// business rules => BMI formula, mapeo categorias

export const calculateBMI = ({ weight, height }: BodyMeasurements) => {
  return weight / height ** 2;
};

export const bmiWeightCategory = (bmi: Bmi): string => {
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal weight";
  } else if (bmi >= 25 && bmi <= 29.9) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

// validations  =>  weigh, height restrictions

export const weightValidation = (weight: BodyMeasurements["weight"]) => {
  if (typeof weight !== "number" || isNaN(weight)) {
    return {
      success: false,
      message: "weight must be a valid number",
    };
  }

  if (weight < 1 || weight > 200) {
    return {
      success: false,
      message: "weight must be between 1Kg and 200Kg",
    };
  }

  return {
    success: true,
    message: "",
  };
};

export const heightValidation = (height: BodyMeasurements["height"]) => {
  if (typeof height !== "number" || isNaN(height)) {
    return {
      success: false,
      message: "height must be a valid number",
    };
  }

  if (height < 0.3 || height > 3) {
    return {
      success: false,
      message: "height must be between 0.3m and 3m",
    };
  }

  return {
    success: true,
    message: "",
  };
};

// ports : save, get-all

export type GetAllSavedRecords = () => Promise<Record[]>;

export type CreateRecord = (params: Omit<Record, "id">) => Promise<Record>;

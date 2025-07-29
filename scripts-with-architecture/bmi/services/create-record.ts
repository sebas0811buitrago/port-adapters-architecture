export interface BMIFileRecord {
  Weight: number;
  Height: number;
  Bmi: number;
}

import { CreateRecord } from "../domain/bmi";
import { saveBMIRecord } from "./handle-json-file";

const createRecordsService = (params: BMIFileRecord) => {
  return saveBMIRecord(params);
};

export const createRecord: CreateRecord = async ({ height, weight, bmi }) => {
  const response = createRecordsService({
    Weight: weight,
    Height: height,
    Bmi: bmi,
  });

  const { Bmi, Height, Id, Weight } = response;

  return {
    bmi: Bmi,
    height: Height,
    id: Id,
    weight: Weight,
  };
};

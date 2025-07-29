import { GetAllSavedRecords } from "../domain/bmi";
import { getAllBMIRecords } from "./handle-json-file";

const getAllRecordsService = () => {
  return getAllBMIRecords();
};

export const getAllRecord: GetAllSavedRecords = async () => {
  const response = getAllRecordsService();

  console.log("response", response);

  return response.records.map(({ Bmi, Height, Id, Weight }) => ({
    bmi: Bmi,
    height: Height,
    id: Id,
    weight: Weight,
  }));
};

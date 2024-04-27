import readline from "readline";
import { csvType } from "../interface/csv.interface";

export const processCSV = async (readableFile: any, csvData: csvType[]) => {
  const data = readline.createInterface({
    input: readableFile,
  });

  for await (const line of data) {
    if (
      line.includes("name") ||
      line.includes("city") ||
      line.includes("country") ||
      line.includes("favorite_sport")
    ) {
      continue;
    }
    const row = line.split(",");
    csvData.push({
      name: row[0].trim(),
      city: row[1].trim(),
      country: row[2].trim(),
      favorite_sport: row[3].trim(),
    });
  }
};

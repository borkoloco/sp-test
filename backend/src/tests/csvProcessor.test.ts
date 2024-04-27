import { Readable } from "stream";
import { csvType } from "../interface/csv.interface";
import { processCSV } from "../service/csvProcessor";

describe("CSV Processor Tests", () => {
  test("processCSV - Process CSV data", async () => {
    const csvData: csvType[] = [];
    const csvContent = `name,city,country,favorite_sport
        John Doe,New York,USA,Basketball
        Jane Smith,London,UK,Football`;

    const readableStream = new Readable();
    readableStream.push(csvContent);
    readableStream.push(null);

    await processCSV(readableStream, csvData);

    expect(csvData).toEqual([
      {
        name: "John Doe",
        city: "New York",
        country: "USA",
        favorite_sport: "Basketball",
      },
      {
        name: "Jane Smith",
        city: "London",
        country: "UK",
        favorite_sport: "Football",
      },
    ]);
  });

  test("processCSV - Process empty CSV data", async () => {
    const csvData: csvType[] = [];
    const csvContent = "";

    const readableStream = new Readable();
    readableStream.push(csvContent);
    readableStream.push(null);

    await processCSV(readableStream, csvData);

    expect(csvData).toEqual([]);
  });
});

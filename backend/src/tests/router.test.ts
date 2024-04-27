import request from "supertest";
import fs from "fs";
import path from "path";
import { app } from "../app";

describe("Router Tests", () => {
  test("POST /api/files - Successful file upload", async () => {
    // Create a temporary CSV file
    const csvFilePath = path.join(__dirname, "test.csv");
    const csvContent =
      "name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball";
    fs.writeFileSync(csvFilePath, csvContent);

    const response = await request(app)
      .post("/api/files")
      .attach("file", csvFilePath);

    fs.unlinkSync(csvFilePath);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("The file was uploaded successfully.");
  });

  test("POST /api/files - Invalid CSV file upload", async () => {
    const response = await request(app)
      .post("/api/files")
      .attach("file", Buffer.from("1,2,3,4\nJohn Doe,New York,USA,Basketball"));

    expect(response.status).toBe(400);
  });

  test("GET /api/users - Search users with query", async () => {
    const csvData = [
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
    ];

    const response = await request(app).get("/api/users?q=John");

    expect(response.status).toBe(200);
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
});

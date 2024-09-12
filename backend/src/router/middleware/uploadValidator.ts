import { Request, Response, NextFunction } from "express";

export const validateFileUpload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { file } = req;

  if (!file) {
    return res
      .status(400)
      .json({ message: "No file provided. Please upload a CSV file." });
  }

  if (!["text/csv", "application/vnd.ms-excel"].includes(file.mimetype)) {
    return res.status(400).json({
      message:
        "This file is not in CSV format. Please upload a valid CSV file.",
    });
  }

  const csvContent = file.buffer.toString("utf-8");
  if (!isValidCSV(csvContent)) {
    return res.status(400).json({
      message:
        "The CSV file is missing required columns: 'name', 'city', 'country', 'favorite_sport'.",
    });
  }

  next();
};

function isValidCSV(content: string): boolean {
  const requiredColumns = ["name", "city", "country", "favorite_sport"];
  const csvRows = content.split("\n");
  const headers = csvRows[0].split(",");

  if (headers.length < requiredColumns.length) {
    return false;
  }

  for (let i = 0; i < requiredColumns.length; i++) {
    if (headers[i].trim().toLowerCase() !== requiredColumns[i]) {
      return false;
    }
  }

  return true;
}

import { Request, Response, NextFunction } from "express";

export const validateFileUpload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({ message: "No file provided." });
  }

  if (file.mimetype !== "text/csv") {
    return res
      .status(400)
      .json({
        message: "This file is not in CSV format. Please upload a CSV file.",
      });
  }

  if (!isValidCSV(file.buffer.toString("utf-8"))) {
    return res
      .status(400)
      .json({ message: "Invalid CSV format. Please upload a valid CSV file." });
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

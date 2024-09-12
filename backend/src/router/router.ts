import { Request, Response, Router } from "express";
import { Readable } from "stream";
import multer from "multer";
import { processCSV } from "../service/csvProcessor";
import { csvType } from "../interface/csv.interface";
import { validateFileUpload } from "./middleware/uploadValidator";

const multerConfig = multer();
const router = Router();

const csvData: csvType[] = [];

router.post(
  "/api/files",
  multerConfig.single("file"),
  validateFileUpload, // Middleware que valida el archivo antes de procesarlo
  async (request: Request, response: Response) => {
    try {
      const { file } = request;

      if (!file) {
        return response.status(400).json({ message: "No file provided." });
      }

      // Si no deseas sobrescribir los datos ya existentes
      if (csvData.length > 0) {
        return response
          .status(409)
          .json({ message: "Data already exists in the database" });
      }

      // Si deseas sobrescribir los datos existentes:
      // csvData.length = 0; // Limpia los datos previos antes de procesar el nuevo CSV

      // Convierte el buffer a un stream para procesar
      const readableStream = new Readable();
      readableStream.push(file.buffer);
      readableStream.push(null);

      processCSV(readableStream, csvData);

      return response
        .status(200)
        .json({ message: "The file was uploaded successfully." });
    } catch (error) {
      console.error("Error processing CSV:", error);
      return response.status(500).json({ message: "Internal Server Error." });
    }
  }
);

router.delete("/api/clear", async (request: Request, response: Response) => {
  try {
    if (csvData.length === 0) {
      return response.status(200).json({ message: "No data to clear" });
    }

    csvData.length = 0; // Borra todos los datos

    return response
      .status(200)
      .json({ message: "The data was cleared successfully." });
  } catch (error) {
    return response.status(500).json({ message: "Internal Server Error." });
  }
});

router.get("/api/users", (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;

    if (csvData.length === 0) {
      return res.status(200).json({ message: "No users found" });
    }

    if (!query) {
      return res.status(200).json({ data: csvData });
    }

    const lowercaseQuery = query.toLowerCase();

    const searchResults = csvData.filter((row) => {
      return Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(lowercaseQuery)
      );
    });

    return res.status(200).json({ data: searchResults });
  } catch (error) {
    console.error("Error searching users:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

export { router };

// import { Request, Response, Router } from "express";
// import { Readable } from "stream";
// import multer from "multer";
// import { processCSV } from "../service/csvProcessor";
// import { csvType } from "../interface/csv.interface";
// import { validateFileUpload } from "./middleware/uploadValidator";

// const multerConfig = multer();
// const router = Router();

// const csvData: csvType[] = [];

// router.post(
//   "/api/files",
//   multerConfig.single("file"),
//   validateFileUpload,
//   async (request: Request, response: Response) => {
//     try {
//       const { file } = request;

//       if (!file) {
//         return response.status(400).json({ message: "No file provided." });
//       }

//       if (csvData.length > 0) {
//         return response
//           .status(409)
//           .json({ message: "Data already exists in the database" });
//       }

//       const readableStream = new Readable();
//       readableStream.push(file.buffer);
//       readableStream.push(null);

//       processCSV(readableStream, csvData);

//       return response
//         .status(200)
//         .json({ message: "The file was uploaded successfully." });
//     } catch (error) {
//       console.error("Error processing CSV:", error);
//       return response.status(500).json({ message: "Internal Server Error." });
//     }
//   }
// );

// router.delete("/api/clear", async (request: Request, response: Response) => {
//   try {
//     if (csvData.length === 0) {
//       return response.status(200).json({ message: "No data to clear" });
//     }

//     csvData.length = 0;

//     return response
//       .status(200)
//       .json({ message: "The data was cleared successfully." });
//   } catch (error) {
//     return response.status(500).json({ message: "Internal Server Error." });
//   }
// });

// router.get("/api/users", (req: Request, res: Response) => {
//   try {
//     const query = req.query.q as string;

//     if (csvData.length === 0) {
//       return res.status(200).json({ message: "No users found" });
//     }

//     if (!query) {
//       return res.status(200).json({ data: csvData });
//     }

//     const lowercaseQuery = query.toLowerCase();

//     const searchResults = csvData.filter((row) => {
//       return Object.values(row).some((value) =>
//         value.toString().toLowerCase().includes(lowercaseQuery)
//       );
//     });

//     return res.status(200).json({ data: searchResults });
//   } catch (error) {
//     console.error("Error searching users:", error);
//     return res.status(500).json({ message: "Internal Server Error." });
//   }
// });

// export { router };

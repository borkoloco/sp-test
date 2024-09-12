import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CsvUploader from "../CsvUploader";
import axios from "axios";

// Mocking axios module
jest.mock("axios", () => ({
  post: jest.fn(),
  get: jest.fn(),
}));

describe("CsvUploader", () => {
  it("renders without crashing", () => {
    render(<CsvUploader />);
    expect(screen.getByText(/SP-Test/i)).toBeInTheDocument();
  });

  it("handles file upload", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      status: 200,
    });

    render(<CsvUploader />);

    // Simulate file selection
    const fileInput = screen.getByTestId("custom-file") as HTMLInputElement;
    const file = new File([""], "test.csv", { type: "text/csv" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    const uploadButton = screen.getByTestId(
      "upload-button"
    ) as HTMLButtonElement;
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        // "http://localhost:3000/api/files",
        process.env.REACT_APP_API_URL,
        //poner dire del back deployado
        expect.any(FormData)
      );
    });
  });
});

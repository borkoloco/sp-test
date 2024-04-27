import React, { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface FileUploaderProps {
  onFileChange: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileChange }) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile: File = e.target.files[0];
      onFileChange(selectedFile);
    }
  };

  return (
    <div>
      <Form>
        <input
          type="file"
          className="form-control"
          id="custom-file"
          data-testid="custom-file"
          accept=".csv"
          onChange={handleFileChange}
        />
      </Form>
    </div>
  );
};

export default FileUploader;

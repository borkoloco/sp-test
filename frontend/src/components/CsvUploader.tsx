import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import SearchBar from "./SearchBar";
import FileUploader from "./FileUploader";
import FileInvalidMessage from "./FileInvalidMessage";
import {
  Container,
  Bar,
  Toolbar,
  Title,
  Body,
  CardWrapper,
  Div,
} from "./style/StyledComponents";

const CsvUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [fileInvalid, setFileInvalid] = useState<boolean>(false);
  const [messageError, setMessageHere] = useState<string>("");

  const url = process.env.REACT_APP_API_URL;

  const uploadFile = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(`${url}/api/files`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          await fetchUsersData();
          setFileInvalid(false);
        }
      }
    } catch (error: any) {
      handleFileUploadError(error);
    }
  };

  const clearData = async () => {
    try {
      const response = await axios.delete(`${url}/api/clear`);
      alert("Data cleared successfully");
      if (response.status === 200) {
        setCsvData([]);
      }
    } catch (error: any) {
      handleFetchDataError(error);
    }
  };

  const handleFetchDataError = useCallback((error: any) => {
    if (error.response && error.response.status === 400) {
      handleFileUploadError(error.response.data.message);
    }
  }, []);

  const fetchUsersData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/users?q=${searchTerm}`);
      setCsvData(response.data.data || []);
    } catch (error: any) {
      handleFetchDataError(error);
    }
  }, [url, searchTerm, handleFetchDataError]);
  const handleFileUploadError = (error: any) => {
    if (error.response) {
      console.error("Error status:", error.response.status);
      console.error("Error data:", error.response.data);

      setMessageHere(
        error.response.data.message || "Upload failed due to an unknown error."
      );
    } else if (error.request) {
      console.error("Error request:", error.request);
      setMessageHere("No response received from server. Please try again.");
    } else {
      console.error("Error message:", error.message);
      setMessageHere(error.message);
    }
    setFileInvalid(true);
  };

  useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData]);

  return (
    <Container>
      <Toolbar>
        <Bar>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </Bar>

        <Title>
          <h5>SP-Test</h5>
        </Title>
        <Div>
          <FileUploader onFileChange={setFile} />
          <Button
            variant="primary"
            onClick={uploadFile}
            data-testid="upload-button"
            disabled={!file}
          >
            Upload
          </Button>
          <Button
            variant="danger"
            onClick={clearData}
            data-testid="clear-button"
            disabled={csvData.length === 0}
          >
            Clear
          </Button>
        </Div>
      </Toolbar>

      {/* Mostrar el mensaje de error si el archivo es inválido */}
      {fileInvalid && messageError && (
        <FileInvalidMessage errorMessage={messageError} />
      )}

      <Body>
        {csvData.map((row, index) => (
          <CardWrapper key={index}>
            <Card.Body>
              {Object.entries(row).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}: </strong> {String(value)}
                </p>
              ))}
            </Card.Body>
          </CardWrapper>
        ))}
      </Body>
    </Container>
  );
};

export default CsvUploader;

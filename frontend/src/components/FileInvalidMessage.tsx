import React from "react";

interface FileInvalidMessageProps {
  errorMessage: string;
}

const FileInvalidMessage: React.FC<FileInvalidMessageProps> = ({
  errorMessage,
}) => {
  return (
    <div className="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  );
};

export default FileInvalidMessage;

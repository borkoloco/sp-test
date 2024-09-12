import React from "react";

interface FileInvalidMessageProps {
  errorMessage: string;
}

const FileInvalidMessage: React.FC<FileInvalidMessageProps> = ({
  errorMessage,
}) => {
  if (!errorMessage) return null; // Si no hay mensaje, no mostramos nada
  return (
    <div className="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  );
};

export default FileInvalidMessage;

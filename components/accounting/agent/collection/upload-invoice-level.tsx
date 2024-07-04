import React, { useState } from "react";
import { Button } from "@components/ui/button";

export default function UploadInvoiceLevel() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
  };

  const handleUpload = () => {
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Upload Invoice Level Collection</h2>
      <div className="grid grid-cols-6 gap-4 mb-4">
        <div className="col-span-4 flex items-end">
          <label className="block text-sm font-medium text-gray-700 mr-4">Select File to upload</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="p-2 border rounded-md bg-white"
            style={{ color: 'black' }}
          />
        </div>
        <div className="col-span-2 flex items-end space-x-2">
          <Button className="bg-red-500 text-white" onClick={handleClear}>Clear</Button>
          <Button className="bg-red-500 text-white" onClick={handleUpload}>Upload</Button>
          <a href="/path-to-template" className="text-blue-500 hover:underline">Download Template</a>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import {FilePondFile, FilePondInitialFile} from 'filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { Select, SelectGroup, SelectLabel, SelectContent, SelectTrigger, SelectItem, SelectValue } from '@components/ui/select';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UploadFile: React.FC = () => {
  const [files, setFiles] = useState<Blob[]>([]);
  const [category, setCategory] = useState<string>('');

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleFileUpdate = (fileItems: FilePondFile[]) => {
    // setFiles(fileItems.map(fileItem => fileItem.file));
    setFiles(fileItems.map(fileItem => fileItem.file));
  };

  return (
    <div className="upload-file-container">
      <style jsx>{`
        .upload-file-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 2rem;
          background-color: #1f1f1f;
          border-radius: 0.5rem;
          color: #fff;
        }

        .upload-file-header {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #e2e8f0;
        }

        .upload-file-category {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .upload-file-category label {
          font-weight: 600;
          font-size: 1rem;
          color: #cbd5e0;
        }

        .filepond--root {
          background-color: #2d3748;
          border: 2px dashed #4a5568;
          color: #e2e8f0;
        }

        .filepond--panel-root {
          background-color: #a0aec0;
        }

        .filepond--drop-label {
          color: #a0aec0;
        }

        .filepond--label-action {
          color: #63b3ed;
        }

        .filepond--item-panel {
          background-color: #4a5568;
        }

        .filepond--file-action-button {
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
        }

        .filepond--file-action-button:hover,
        .filepond--file-action-button:focus {
          box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.9);
        }
      `}</style>
      <h1 className="upload-file-header">Upload Files</h1>
      <div className="upload-file-category">
        <label htmlFor="category">Choose a category:</label>
        <Select value={category} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="documents">Documents</SelectItem>
              <SelectItem value="images">Images</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <FilePond
        files={files}
        onupdatefiles={handleFileUpdate}
        allowMultiple={true}
        maxFiles={3}
        server="/api" // to add backend
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  );
};

export default UploadFile;

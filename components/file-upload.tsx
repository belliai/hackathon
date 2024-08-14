import React, { useState, ChangeEvent } from 'react';
import { FilePond, registerPlugin, FilePondFile } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { Select,SelectGroup, SelectLabel, SelectContent, SelectTrigger,SelectItem, SelectValue } from './ui/select';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const FilePondWithDropdown: React.FC = () => {
  const [files, setFiles] = useState<FilePondFile[]>([]);
  const [category, setCategory] = useState<string>('');

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleFileUpdate = (fileItems: FilePondFile[]) => {
    setFiles(fileItems.map(fileItem => fileItem.file));
  };

  return (
    <div className="filepond-with-dropdown">
      <style jsx>{`
        /* Grid layout for FilePond items */
        .filepond--item {
          width: calc(50% - 0.5em);
        }

        @media (min-width: 30em) {
          .filepond--item {
            width: calc(50% - 0.5em);
          }
        }

        @media (min-width: 50em) {
          .filepond--item {
            width: calc(33.33% - 0.5em);
          }
        }

        /* FilePond default font stack */
        .filepond--root {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
              sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
        }

        /* Common style overrides */
        .filepond--file-action-button {
          cursor: pointer;
        }

        .filepond--drop-label {
          color: #555;
        }

        .filepond--label-action {
          text-decoration-color: #aaa;
        }

        .filepond--panel-root {
          background-color: #f0f0f0;
          border-radius: 0.5em;
        }

        .filepond--item-panel {
          border-radius: 0.5em;
          background-color: #555;
        }

        .filepond--drip-blob {
          background-color: #999;
        }

        .filepond--file-action-button {
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
        }

        .filepond--file-action-button:hover,
        .filepond--file-action-button:focus {
          box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.9);
        }

        .filepond--file {
          color: white;
        }

        [data-filepond-item-state*='error'] .filepond--item-panel,
        [data-filepond-item-state*='invalid'] .filepond--item-panel {
          background-color: red;
        }

        [data-filepond-item-state='processing-complete'] .filepond--item-panel {
          background-color: green;
        }

        .filepond--panel-root {
          background-color: transparent;
          border: 2px solid #2c3340;
        }

        /* Limiting the height of FilePond */
        .filepond--root {
          max-height: 10em;
        }
      `}</style>
      <h1>Upload Files with Category</h1>
      <div padding-50>
        <label htmlFor="category">Choose a category:</label>
        <Select value={category} onValueChange={(value) => handleCategoryChange}>
            <SelectTrigger className="w-32">
                <SelectValue placeholder={`Select a Category`} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="documents">Documents</SelectItem>
                  <SelectItem value="images">Images</SelectItem>
                  <SelectItem value="videos">Videos</SelectItem>
                </SelectGroup>
              </SelectContent>
              </Select>
      </div>

      <FilePond
        files={files}
        onupdatefiles={handleFileUpdate}
        allowMultiple={true}
        maxFiles={3}
        server="/api"
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  );
};

export default FilePondWithDropdown;

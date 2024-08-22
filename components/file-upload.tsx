import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import { FilePondFile } from 'filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Filepond: React.FC = () => {
  const [files, setFiles] = useState<Blob[]>([]);

  const handleFileUpdate = (fileItems: FilePondFile[]) => {
    setFiles(fileItems.map(fileItem => fileItem.file));
  };

  return (
    <div className="fles flex-col w-full h-full">
      <style jsx>{`
        .filepond--root {
          border-radius: 0.5rem; /* rounded-lg */
          border: 2px dashed #d1d5db; /* border-gray-300 */
          color: #6b7280; /* text-gray-500 */
          height: full; /* h-64 */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .filepond--drop-label {
          color: #6b7280; /* text-gray-500 */
          font-size: 0.875rem; /* text-sm */
          text-align: center;
        }

        .filepond--label-action {
          color: #374151; /* text-gray-700 */
          font-weight: 600; /* font-semibold */
        }

        .filepond--panel-root {
          background-color: transparent; /* Keep the panel transparent */
        }

        .filepond--item-panel {
          background-color: #374151; /* Darker panel background for file items */
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

      <FilePond
        files={files}
        onupdatefiles={handleFileUpdate}
        allowMultiple={true}
        maxFiles={3}
        server="/api" // Placeholder for backend integration
        name="files"
        labelIdle={`
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400 w-500">
              <span class="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
        `}
      />
    </div>
  );
};

export default Filepond;

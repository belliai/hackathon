import React, { useRef, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import {FilePondFile, FilePondInitialFile} from 'filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { Select, SelectGroup, SelectLabel, SelectContent, SelectTrigger, SelectItem, SelectValue } from '@components/ui/select';
import { DataTable } from "@components/data-table/data-table"
import { Card } from '@/components/ui/card';
import Dropzone from '@/components/ui/dropzone';
import Filepond from '@/components/file-upload';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
interface FileData {
  name: string;
  size: string; // Size as a string formatted in KB
  type: string;
}

const UploadFile: React.FC = () => {
  // const [files, setFiles] = useState<Blob[]>([]);
  const [files, setFiles] = useState<FileData[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (fileList) {
      const updatedFiles = Array.from(fileList).map(file => ({
        name: file.name,
        size: (file.size / 1024).toFixed(2), // Size in KB
        type: file.type,
      }));

      setFiles(updatedFiles);
    }
  };

  // const handleFileUpdate = (fileItems: FilePondFile[]) => {
  //   setFiles(fileItems.map(fileItem => fileItem.file))
  //   setTableFiles(fileItems.map(fileItem => ({
  //     name: fileItem.file.name,
  //     size: (fileItem.file.size / 1024).toFixed(2), // Size in KB
  //     type: fileItem.file.type,
  //   })));
  // };

  const columns = [
    {
      accessorKey: 'name',
      header: 'File Name',
    },
    {
      accessorKey: 'Amount',
      header: 'Amount',
    },
    {
      accessorKey: 'type',
      header: 'Type',
    },{
      accessorKey: 'ID',
      header: 'ID',
    },
  ];

  return (
    <div className="upload-file-container animate-fade-left">
      <style jsx>{`
      .upload-file-container {
          display: flex;
          flex-direction: column;
          padding: 0rem;
          // background-color: #1f1f1f;
          color: #1f1f1f;
        }

        .upload-file-header {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #e2e8f0;
        }

      `}</style>
      <div className="animate-fade-left">
        <Card className="grid grid-cols-1 gap-x-3 p-4">
          <div className="grid grid-cols-1 gap-x-3 gap-y-2">
            <Dropzone/>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              multiple // Allow multiple file selection
            />
          </div>
        </Card>
        <Card className="p-4 border-none">
          <DataTable<FileData, string>
            columns={columns}
            data={files}
            hidePagination={true}
            hideToolbar
            className="border-none [&_td]:px-3 [&_td]:py-1 [&_td]:text-muted-foreground [&_th]:px-3 [&_th]:py-2 [&_th]:text-foreground max-h-44 xl:max-h-80 overflow-y-auto custom-scrollbar max-w-[814px]"
            
          />
        </Card>
    </div>
    </div>
  );
};

export default UploadFile;

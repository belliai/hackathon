"use client";

import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import FilePondWithDropdown from '@/components/file-upload'; // Adjust the import path accordingly

const FileUploadPage: React.FC = () => {
  return (
    <PageContainer className="gap-6 py-8">
      <FilePondWithDropdown />
    </PageContainer>
  );
};

export default FileUploadPage;

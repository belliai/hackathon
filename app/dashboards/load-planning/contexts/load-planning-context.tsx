import { zodResolver } from '@hookform/resolvers/zod';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LoadPlanningFilterSchemas, FormFilter } from '../types/schemas';
import { LoadPlanningContextType, LoadPlanningProviderProps } from '../types';

const LoadPlanningContext = createContext<LoadPlanningContextType | undefined>(undefined);

export const useLoadPlanningContext = () => {
  const context = useContext(LoadPlanningContext);
  if (context === undefined) {
    throw new Error('useLoadPlanningContext must be used within a LoadPlanningProvider');
  }
  return context;
};

export const LoadPlanningProvider: React.FC<LoadPlanningProviderProps> = ({ children }) => {
  const formFilterHooks = useForm<FormFilter>({
    resolver: zodResolver(LoadPlanningFilterSchemas),
    defaultValues: {
      search: '',
      origin: '',
      destination: '',
      status: '',
      filterDate: '',
    },
  })

  const onSubmitFilters = (data: FormFilter) => {
    console.log(data)
  }

  useEffect(() => {
    console.log('LoadPlanningProvider mounted');
  }, []);

  const value: LoadPlanningContextType = {
    formFilterHooks,
    onSubmitFilters,
  } as LoadPlanningContextType;

  return (
    <LoadPlanningContext.Provider value={value}>
      {children}
    </LoadPlanningContext.Provider>
  );
};
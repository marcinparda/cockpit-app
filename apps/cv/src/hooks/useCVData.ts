import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { CVData } from '../types/cv.types';
import {
  headerData,
  summaryData,
  skillsData,
  achievementsData,
  experienceData,
  educationData,
  personalProjectsData,
  coursesData,
} from '../data/cvData';
import { getCVData, putCVData } from '../services/cvStoreApi';

const defaultCVData: CVData = {
  header: headerData,
  summary: summaryData,
  skills: skillsData,
  achievements: achievementsData,
  experience: experienceData,
  education: educationData,
  personalProjects: personalProjectsData,
  courses: coursesData,
};

export function useCVData() {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const isInitialLoadDone = useRef(false);

  const { data: storedData, isLoading } = useQuery({
    queryKey: ['cv-store-data'],
    queryFn: getCVData,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!isLoading && !isInitialLoadDone.current) {
      isInitialLoadDone.current = true;
      if (storedData) {
        setCVData(storedData);
      }
    }
  }, [isLoading, storedData]);

  const { mutate: saveData, isPending: isSaving } = useMutation({
    mutationFn: putCVData,
  });

  function saveToApi() {
    saveData(cvData);
  }

  function resetToDefault() {
    setCVData(defaultCVData);
  }

  return { cvData, setCVData, resetToDefault, saveToApi, isSaving, isLoading };
}

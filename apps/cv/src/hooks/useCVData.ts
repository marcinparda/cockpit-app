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
  const skipNextSave = useRef(false);

  const { data: storedData, isLoading } = useQuery({
    queryKey: ['cv-store-data'],
    queryFn: getCVData,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!isLoading && !isInitialLoadDone.current) {
      isInitialLoadDone.current = true;
      if (storedData) {
        skipNextSave.current = true;
        setCVData(storedData);
      }
    }
  }, [isLoading, storedData]);

  const { mutate: saveData } = useMutation({
    mutationFn: putCVData,
  });

  useEffect(() => {
    if (!isInitialLoadDone.current) return;
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    const timer = setTimeout(() => {
      saveData(cvData);
    }, 1000);
    return () => clearTimeout(timer);
  }, [cvData, saveData]);

  function resetToDefault() {
    setCVData(defaultCVData);
  }

  return { cvData, setCVData, resetToDefault, isLoading };
}

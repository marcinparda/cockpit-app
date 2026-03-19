import { useState, useEffect } from 'react';
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

const STORAGE_KEY = 'cv-editor-data';

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
  const [cvData, setCVData] = useState<CVData>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultCVData;
      }
    }
    return defaultCVData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
  }, [cvData]);

  function resetToDefault() {
    setCVData(defaultCVData);
  }

  return { cvData, setCVData, resetToDefault };
}

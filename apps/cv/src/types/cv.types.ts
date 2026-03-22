export interface HeaderData {
  name: string;
  title: string;
  phone: string;
  email: string;
  linkedin: {
    url: string;
    text?: string;
  };
  location: string;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface Experience {
  title: string;
  company: string;
  details?: string;
  date: string;
  location: string;
  description: string[];
}

export interface Education {
  degree: string;
  university: string;
  years: string;
}

export interface PersonalProject {
  name: string;
  liveUrl: string;
  code: string;
  date: string;
  description: string[];
}

export interface Skill {
  name: string;
  years: number;
  description: string;
}

export interface CVData {
  header: HeaderData;
  summary: string[];
  skills: Skill[];
  achievements: Achievement[];
  experience: Experience[];
  education: Education[];
  personalProjects: PersonalProject[];
  courses: string[];
}

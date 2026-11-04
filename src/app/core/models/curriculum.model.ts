export interface TechStackItem {
  name: string;
  purpose: string;
  logoKeys: string[];
}

export interface LearningJourneyStep {
  step: number;
  title: string;
  weeks: string;
  color: string;
  icon: string;
  points: string[];
}

export interface ProgrammeDetailItem {
  label: string;
  value: string;
  icon: string;
}

export interface MakerStep {
  step: string;
  name: string;
  description: string;
}

export interface CohortCurriculumData {
  motto: string;
  title: string;
  subtitle: string;
  makerSteps: MakerStep[];
  pillars?: {
    title: string;
    description: string;
    icon: string;
    color: string;
  }[];
  techStack: TechStackItem[];
  learningJourney: LearningJourneyStep[];
  whatYoullAchieve: string[];
  programmeDetails: ProgrammeDetailItem[];
  footerTagline: string;
}

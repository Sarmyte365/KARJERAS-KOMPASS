
export enum DiscType {
  D = 'Dominance',
  I = 'Ietekme',
  S = 'Stabilitāte',
  C = 'Analītika'
}

export interface AnswerOption {
  text: string;
  category: DiscType;
}

export interface Question {
  id: number;
  text: string;
  options: AnswerOption[];
}

export interface DiscResults {
  D: number;
  I: number;
  S: number;
  C: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface DetailedInfo {
  description: string;
  strengths: string[];
  challenges: string[];
  careers: string[];
}

export type DiscDescriptions = Record<DiscType, DetailedInfo>;

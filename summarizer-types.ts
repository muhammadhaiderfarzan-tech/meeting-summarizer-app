/**
 * Summarizer app shared types
 */

export interface SummaryResult {
  summary: string[];
  assignments: Assignment[];
  exams: ExamReminder[];
  actionItems: ActionItem[];
  detectedDates: string[];
}

export interface Assignment {
  task: string;
  due_date: string;
  details?: string;
}

export interface ExamReminder {
  exam: string;
  date: string;
  prep_notes?: string;
}

export interface ActionItem {
  text: string;
  priority: "High" | "Medium" | "Low";
  assignee?: string;
}

export interface SavedSummary {
  id: string;
  transcript: string;
  result: SummaryResult;
  createdAt: number;
  preview: string;
}

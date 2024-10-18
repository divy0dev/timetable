export interface Subject {
  name: string;
}

export interface Faculty {
  name: string;
  subject: string;
}

export interface TimeSlot {
  start: string;
  end: string;
}

export interface TimetableData {
  [year: string]: { subject: string; faculty: string }[][];
}
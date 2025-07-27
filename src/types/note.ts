export type NoteTag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

export interface Note {
  id: number;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface NewNotesData {
  content: string;
  tag: NoteTag;
  title: string;
}

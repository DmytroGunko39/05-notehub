export type NoteTag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

export interface Note {
  id: number;
  title: string;
  content: string;
  tag: NoteTag;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNotesData {
  content: string;
  tag: NoteTag;
  title: string;
}

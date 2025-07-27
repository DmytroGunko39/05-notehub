import axios from "axios";
import type { NewNotesData, Note } from "../types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  search: string = ""
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(`/notes`, {
    params: {
      page,
      perPage,
      ...(search.trim() ? { search: search.trim() } : {}),
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return response.data;
};

export const createNote = async (notesData: NewNotesData) => {
  const response = await axios.post<Note>("/notes", notesData, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return response.data;
};

export const deleteNote = async (noteId: number) => {
  const response = await axios.delete(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return response.data;
};

// lib>api>clientApi.ts

import type { Note, NoteTag } from '@/types/note';
import { nextServer } from './api';
import { type User } from '@/types/user';

// fetchNotes
// fetchNoteById
// createNote
// deleteNote
// register
// login

// logout
// checkSession
// getMe
// updateMe

// ----------------------------------GET-NOTES----------------------------------------------
export interface GetNoteParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
  totalItems: number;
}

export const getNotes = async (
  params: GetNoteParams = { page: 1, perPage: 12 }
): Promise<FetchNotesResponse> => {
  const res = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      page: params.page,
      perPage: params.perPage,
      ...(params.search ? { search: params.search } : {}),
      ...(params.tag ? { tag: params.tag } : {}),
    },
  });
  console.log('hello');
  return res.data;
};

// -----------------------------GET-NOTE-BY-ID----------------------------------------------
export const getNoteById = async (noteId: Note['id']): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`);
  return data;
};

// ---------------------------------CREATE--------------------------------------------------
export interface CreateNotePayload {
  title: string;
  content?: string;
  tag: NoteTag;
}

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const res = await nextServer.post<Note>('/notes', payload);
  return res.data;
};

// ----------------------------------UPDATE-------------------------------------------------
export interface UpdateNotePayload {
  id: string;
  title?: string;
  content?: string;
  tag?: NoteTag;
}

export const updateNote = async ({
  id,
  ...patch
}: UpdateNotePayload): Promise<Note> => {
  const res = await nextServer.patch<Note>(`/notes/${id}`, patch);
  return res.data;
};

// -----------------------------------DELETE------------------------------------------------
export const deleteNote = async (noteId: string) => {
  const res = await nextServer.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

// -----------------------------------LOGIN------------------------------------------------
export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};
// -----------------------------------REGISTER------------------------------------------------

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};
// -----------------------------------LOGOUT------------------------------------------------

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const checkSession = async (): Promise<boolean> => {
  try {
    await nextServer.get('/auth/session');
    return true;
  } catch {
    return false;
  }
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export type UpdateUserPayload = {
  username?: string;
};

export async function updateMe(payload: UpdateUserPayload) {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
}

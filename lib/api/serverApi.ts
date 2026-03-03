//  lib/api/serverApi.ts — для функцій, які викликаються у серверних компонентах (до params потрібно додавати cookeis у headers):

import { nextServer } from './api';
import type { User } from '@/types/user';
import { Note } from '@/types/note';
import { cookies } from 'next/headers';

// fetchNotes
// fetchNoteById
// getMe
// checkSession.
//---------------------------getMe-----------------------------------------
const PER_PAGE = 12;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
  totalItems: number;
}

export async function getNotes(
  currentPage: number,
  search?: string,
  tagName?: string
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      search,
      page: currentPage,
      perPage: PER_PAGE,
      tag: tagName,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
}

export async function getNoteById(noteId: Note['id']): Promise<Note> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function getMe() {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function checkServerSession() {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
}

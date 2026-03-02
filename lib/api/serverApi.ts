//  lib/api/serverApi.ts — для функцій, які викликаються у серверних компонентах (до params потрібно додавати cookeis у headers):

import { nextServer } from './api';
import type { User } from '@/types/user';
import { cookies } from 'next/headers';

// fetchNotes
// fetchNoteById
// getMe
// checkSession.
//---------------------------getMe-----------------------------------------

export async function getMe() {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
export async function checkSession() {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
}

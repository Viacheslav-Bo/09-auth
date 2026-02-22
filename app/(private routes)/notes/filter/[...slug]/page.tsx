// app/notes/filter/[...slug]/page.tsx

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { getNotes, type GetNoteParams } from '@/lib/api';
import { type NoteTag } from '@/types/note';
import NotesClient from './Notes.client';
import type { Metadata } from 'next';

interface NotesByCatgoryProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesByCatgoryProps): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug?.[0] ?? 'all';
  const title = `Notes: ${filter} | NoteHub`;
  const description = `Notes page filtered by: ${filter}.`;

  return {
    title,
    description,
    alternates: { canonical: `/notes/filter/${slug.join('/')}` },
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${slug.join('/')}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

export default async function NotesByCategory({ params }: NotesByCatgoryProps) {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : (slug[0] as NoteTag);

  const initialParams: GetNoteParams = {
    page: 1,
    perPage: 12,
    ...(tag ? { tag } : {}),
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', initialParams],
    queryFn: () => getNotes(initialParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialParams={initialParams} tag={tag} />
    </HydrationBoundary>
  );
}

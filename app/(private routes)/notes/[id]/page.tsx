// app/notes/[id]/page.tsx

import { getNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await getNoteById(id);

  const title = `Note: ${note.title}`;
  const description = (note.content ?? '').slice(0, 30);

  return {
    title,
    description,
    alternates: { canonical: `/notes/${id}` },
    openGraph: {
      title,
      description: (note.content ?? '').slice(0, 100),
      url: `https://notehub.com/notes/${id}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
      type: 'article',
    },
  };
}

export default async function NotePage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

import NotePreviewClient from './NotePreview.client';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/api/getQueryClient';
import { getNoteById } from '@/lib/api/clientApi';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}

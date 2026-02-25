'use client';

import css from '@/components/NoteForm/NoteForm.module.css';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { NoteTag } from '@/types/note';
// import * as Yup from 'yup';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';
import { useNoteStore } from '@/lib/store/noteStore';

export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

// const initialValues: NoteFormValues = {
//   title: '',
//   content: '',
//   tag: 'Todo',
// };

interface NoteFormProps {
  onCancel?: () => void;
}

// const validationYup = Yup.object({
//   title: Yup.string()
//     .min(3, 'Min 3 characters')
//     .max(50, 'Max 50 characters')
//     .required('Title is required'),
//   content: Yup.string().max(500, 'Max 500 characters'),
//   tag: Yup.mixed<NoteTag>()
//     .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
//     .required('Tag is required'),
// });

export default function NoteForm({ onCancel }: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleCancel = () => {
    if (onCancel) return onCancel();
    router.back();
  };

  const formAction = async (formData: FormData) => {
    const title = String(formData.get('title') ?? '').trim();
    const content = String(formData.get('content') ?? '').trim();
    const tag = String(formData.get('tag') ?? 'Todo') as NoteTag;

    if (title.length < 3 || title.length > 50) {
      toast.error('Title must be 3–50 characters');
      return;
    }
    if (content.length > 500) {
      toast.error('Content max 500 characters');
      return;
    }

    try {
      await createNote({ title, content, tag });
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note created successfully');
      clearDraft();
      handleCancel();
    } catch {
      toast.error('Failed to create note');
    }
  };

  return (
    <form className={css.form} action={formAction}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={draft.title}
          onChange={e => setDraft({ title: e.target.value })}
          minLength={3}
          maxLength={50}
          required
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={e => setDraft({ content: e.target.value })}
          maxLength={500}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={e => setDraft({ tag: e.target.value as NoteTag })}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}

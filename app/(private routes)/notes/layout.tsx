// app/notes/layout.tsx
export default function NotesLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

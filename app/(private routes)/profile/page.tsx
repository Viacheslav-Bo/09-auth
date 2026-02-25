import Link from 'next/link';
import Image from 'next/image';
import css from './ProfilePage.module.css';

export const metadata: Metadata = {
  title: 'User profile | NoteHub',
  description: 'Your profile page',

  openGraph: {
    title: 'User profile | NoteHub',
    description: 'Your profile page',
    url: '/profile', // metadataBase підставиться автоматично
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
};

export default function Profile() {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>

          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src="https://ac.goit.global/fullstack/react/notehub-user-default.jpg"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: your_username</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
}

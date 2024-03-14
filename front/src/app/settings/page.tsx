
import AboutForm from '@/components/Forms/AboutForm/AboutForm';
import ContactsForm from '@/components/Forms/ContactsForm/ContactsForm';
import styles from './page.module.scss';

export default function Settings() {
  return (
    <main className={styles.main}>
      <div className={styles.settings}>
        <ContactsForm />
        <AboutForm />
      </div>
    </main>
  );
}

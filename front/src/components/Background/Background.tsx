import styles from './Background.module.scss';

export default function Background() {
  return (
    <div
      className={`
      ${styles.bg}
     before:bg-gradient-to-bl
     from-secondary
     to-primary to-70%
     dark:before:bg-gradient-to-bl
     dark:from-gray-700 dark:from-30%
     dark:to-secondary-dark
     before:shadow-shadowLight
     dark:before:shadow-shadowDark
     `}
    >
      <div></div>
    </div>
  );
}

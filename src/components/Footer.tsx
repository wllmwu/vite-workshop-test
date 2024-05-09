import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>{"\u00a9"} 2024 Your Name Here</p>
        <p>This cool site was built with Vite and React.</p>
      </div>
    </footer>
  );
}

export default Footer;

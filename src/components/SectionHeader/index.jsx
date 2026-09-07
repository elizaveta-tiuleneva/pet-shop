import { Link } from "react-router-dom";
import styles from "./SectionHeader.module.css";

function SectionHeader({ title, linkText, to }) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.navigation}>
        <div className={styles.line}></div>

        <Link className={styles.allCategories} to={to}>
          {linkText}
        </Link>
      </div>
    </div>
  );
}

export default SectionHeader;
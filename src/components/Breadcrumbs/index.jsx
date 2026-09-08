import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

function Breadcrumbs({ items }) {
  return (
    <div className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <div className={styles.item} key={index}>
          {item.to ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default Breadcrumbs;
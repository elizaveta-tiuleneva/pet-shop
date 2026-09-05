import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.css";

function CategoryCard({ id, title, image }) {
  return (
    <Link to={`/categories/${id}`} className={styles.card}>
      <img
        src={`http://localhost:3333${image}`}
        alt={title}
        className={styles.image}
      />

      <h3 className={styles.title}>{title}</h3>
    </Link>
  );
}

export default CategoryCard;
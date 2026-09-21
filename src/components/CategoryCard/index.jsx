import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.css";

function CategoryCard({ id, title, image }) {
  return (
    <Link to={`/categories/${id}`} className={styles.card}>
      <img
        src={`https://pet-shop-ls17.onrender.com${image}`}
        alt={title}
        className={styles.image}
      />

      <h3 className={styles.title}>{title}</h3>
    </Link>
  );
}

export default CategoryCard;
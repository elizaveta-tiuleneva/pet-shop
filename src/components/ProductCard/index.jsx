import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  const discountPercent = Math.round(
    ((product.price - product.discont_price) / product.price) * 100
  );

  return (
    <Link
      to={`/products/${product.id}`}
      className={styles.card}
    >
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={`http://localhost:3333${product.image}`}
          alt={product.title}
        />

        <span className={styles.discount}>
          -{discountPercent}%
        </span>
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>
          {product.title}
        </h3>

        <div className={styles.prices}>
          <span className={styles.discountPrice}>
            ${product.discont_price}
          </span>

          <span className={styles.price}>
            ${product.price}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
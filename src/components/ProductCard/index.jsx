import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  const hasDiscount = product.discont_price !== null;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.discont_price) / product.price) * 100
      )
    : 0;

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

        {hasDiscount && (
          <span className={styles.discount}>
            -{discountPercent}%
          </span>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>
          {product.title}
        </h3>

        <div className={styles.prices}>
          {hasDiscount ? (
            <>
              <span className={styles.discountPrice}>
                ${product.discont_price}
              </span>

              <span className={styles.price}>
                ${product.price}
              </span>
            </>
          ) : (
            <span className={styles.discountPrice}>
              ${product.price}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
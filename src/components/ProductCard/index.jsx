import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToCart } from "../../store/cartSlice";
import Button from "../../ui/Button";

import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);

  const hasDiscount = product.discont_price !== null;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.discont_price) /
          product.price) *
          100
      )
    : 0;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity: 1,
      })
    );

    setIsAdded(true);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageArea}>
        <Link
          to={`/products/${product.id}`}
          className={styles.imageLink}
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
        </Link>

        <div className={styles.addButton}>
          <Button
            variant={isAdded ? "cardAdded" : "card"}
            type="button"
            onClick={handleAddToCart}
          >
            {isAdded ? "Added" : "Add to cart"}
          </Button>
        </div>
      </div>

      <Link
        to={`/products/${product.id}`}
        className={styles.infoLink}
      >
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
    </div>
  );
}

export default ProductCard;
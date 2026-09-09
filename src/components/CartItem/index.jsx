import { useDispatch } from "react-redux";

import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "../../store/cartSlice";

import styles from "./CartItem.module.css";

function CartItem({
  product,
  isSelected,
  onSelect,
}) {
  const dispatch = useDispatch();

  const hasDiscount = product.discont_price !== null;

  const currentPrice = hasDiscount
    ? product.discont_price
    : product.price;

  const handleIncrease = () => {
    dispatch(
      addToCart({
        product,
        quantity: 1,
      })
    );
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity(product.id));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={`http://localhost:3333${product.image}`}
          alt={product.title}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.top}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onSelect}
            />

            <span className={styles.checkmark}>
              {isSelected && "✓"}
            </span>
          </label>

          <h3 className={styles.title}>
            {product.title}
          </h3>

          <button
            type="button"
            className={styles.remove}
            onClick={handleRemove}
            aria-label="Remove product"
          >
            ×
          </button>
        </div>

        <div className={styles.bottom}>
          <div className={styles.counter}>
            <button
              type="button"
              onClick={handleDecrease}
            >
              −
            </button>

            <span>{product.quantity}</span>

            <button
              type="button"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>

          <div className={styles.prices}>
            <span className={styles.currentPrice}>
              ${currentPrice}
            </span>

            {hasDiscount && (
              <span className={styles.oldPrice}>
                ${product.price}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
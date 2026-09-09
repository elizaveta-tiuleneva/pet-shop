import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import SectionHeader from "../../components/SectionHeader";
import CartItem from "../../components/CartItem";
import OrderForm from "../../components/OrderForm";
import SuccessModal from "../../components/SuccessModal";
import Button from "../../ui/Button";

import { removeSelectedFromCart } from "../../store/cartSlice";

import styles from "./Cart.module.css";

function CartPage() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const selectedItems = cartItems.filter((item) =>
    selectedIds.includes(item.id)
  );

  const totalQuantity = selectedItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = selectedItems.reduce((total, item) => {
    const price =
      item.discont_price !== null
        ? item.discont_price
        : item.price;

    return total + price * item.quantity;
  }, 0);

  const handleSelect = (productId) => {
    setSelectedIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }

      return [...prev, productId];
    });
  };

  const handleOrderSuccess = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);

    dispatch(removeSelectedFromCart(selectedIds));

    setSelectedIds([]);
  };

  return (
    <>
      <div className={styles.cart}>
        <SectionHeader
          title="Shopping cart"
          linkText="Back to the store"
          to="/products"
        />

        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <p className={styles.emptyText}>
              Looks like you have no items in your basket currently.
            </p>

            <Link
              to="/products"
              className={styles.continueLink}
            >
              <Button variant="continue">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            <div className={styles.items}>
              {cartItems.map((product) => (
                <CartItem
                  key={product.id}
                  product={product}
                  isSelected={selectedIds.includes(product.id)}
                  onSelect={() => handleSelect(product.id)}
                />
              ))}
            </div>

            <div className={styles.orderDetails}>
              <div className={styles.orderInfo}>
                <h2 className={styles.orderTitle}>
                  Order details
                </h2>

                <p className={styles.itemsCount}>
                  {totalQuantity}{" "}
                  {totalQuantity === 1 ? "item" : "items"}
                </p>

                <div className={styles.total}>
                  <span>Total</span>

                  <strong>
                    ${totalPrice.toFixed(2)}
                  </strong>
                </div>
              </div>

              <OrderForm
                cartItems={selectedItems}
                onOrderSuccess={handleOrderSuccess}
              />
            </div>
          </div>
        )}
      </div>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="Congratulations!"
      >
        <p>
          Your order has been successfully placed on the website.
        </p>

        <p>
          A manager will contact you shortly to confirm your order.
        </p>
      </SuccessModal>
    </>
  );
}

export default CartPage;
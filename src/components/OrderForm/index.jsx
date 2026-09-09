import { useForm } from "react-hook-form";
import axios from "axios";

import Button from "../../ui/Button";
import styles from "./OrderForm.module.css";

function OrderForm({
  cartItems,
  onOrderSuccess,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    const orderData = {
      ...formData,
      products: cartItems,
    };

    try {
      await axios.post(
        "http://localhost:3333/order/send",
        orderData
      );

      reset();
      onOrderSuccess();
    } catch (error) {
      console.error("Order error:", error);
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.field}>
        <input
          type="text"
          placeholder="Name"
          {...register("name", {
            required: "Name is required",
          })}
        />

        {errors.name && (
          <span className={styles.error}>
            {errors.name.message}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <input
          type="tel"
          placeholder="Phone number"
          {...register("phone", {
            required: "Phone number is required",
          })}
        />

        {errors.phone && (
          <span className={styles.error}>
            {errors.phone.message}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          })}
        />

        {errors.email && (
          <span className={styles.error}>
            {errors.email.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        variant="order"
      >
        Order
      </Button>
    </form>
  );
}

export default OrderForm;
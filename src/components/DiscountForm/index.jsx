import { useState } from "react";
import axios from "axios";

import Button from "../../ui/Button";
import pets from "../../assets/img/discount-pets.svg";
import styles from "./DiscountForm.module.css";

function DiscountForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        "http://localhost:3333/sale/send",
        formData
      );

      setIsSubmitted(true);
      setIsModalOpen(true);

      setFormData({
        name: "",
        phone: "",
        email: "",
      });
    } catch (error) {
      console.error("Discount request error:", error);
    }
  };

  return (
    <>
      <section className={styles.discount}>
        <h2 className={styles.title}>
          5% off on the first order
        </h2>

        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              src={pets}
              alt="Pets"
            />
          </div>

          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <div className={styles.inputs}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              variant={isSubmitted ? "submitted" : "discount"}
              type="submit"
              disabled={isSubmitted}
            >
              {isSubmitted
                ? "Request Submitted"
                : "Get a discount"}
            </Button>
          </form>
        </div>
      </section>

      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modal}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close"
            >
              ×
            </button>

            <h2 className={styles.modalTitle}>
              Congratulations!
            </h2>

            <p className={styles.modalText}>
              Your 5% discount has been successfully applied.
            </p>

            <p className={styles.modalText}>
              We’ll contact you shortly with the details.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default DiscountForm;
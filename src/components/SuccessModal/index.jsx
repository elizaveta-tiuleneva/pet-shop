import { useEffect } from "react";
import styles from "./SuccessModal.module.css";

function SuccessModal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <h2 className={styles.title}>
          {title}
        </h2>

        <div className={styles.text}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
import { useState } from "react";
import styles from "./ProductFilters.module.css";

function ProductFilters({
  priceFrom,
  setPriceFrom,
  priceTo,
  setPriceTo,
  discountedOnly,
  setDiscountedOnly,
  sortType,
  setSortType,
  showDiscountFilter = true,
}) {
  const [sortOpen, setSortOpen] = useState(false);

  const sortOptions = [
    {
      value: "default",
      label: "by default",
    },
    {
      value: "newest",
      label: "newest",
    },
    {
      value: "high-low",
      label: "price: high-low",
    },
    {
      value: "low-high",
      label: "price: low-high",
    },
  ];

  const currentSortLabel =
    sortOptions.find(
      (option) => option.value === sortType
    )?.label;

  return (
    <div className={styles.filters}>
      <div className={styles.priceFilter}>
        <span className={styles.filterTitle}>
          Price
        </span>

        <input
          type="number"
          min="0"
          placeholder="from"
          value={priceFrom}
          onChange={(event) =>
            setPriceFrom(
              event.target.value === ""
                ? ""
                : Math.max(
                    0,
                    Number(event.target.value)
                  )
            )
          }
        />

        <input
          type="number"
          min="0"
          placeholder="to"
          value={priceTo}
          onChange={(event) =>
            setPriceTo(
              event.target.value === ""
                ? ""
                : Math.max(
                    0,
                    Number(event.target.value)
                  )
            )
          }
        />
      </div>

      {showDiscountFilter && (
        <label className={styles.discountFilter}>
          <span>Discounted items</span>

          <input
            type="checkbox"
            checked={discountedOnly}
            onChange={(event) =>
              setDiscountedOnly(event.target.checked)
            }
          />
        </label>
      )}

      <div className={styles.sortFilter}>
        <span>Sorted</span>

        <div className={styles.sort}>
          <button
            type="button"
            className={styles.sortButton}
            onClick={() =>
              setSortOpen((prev) => !prev)
            }
          >
            {currentSortLabel}

            <span
              className={`${styles.arrow} ${
                sortOpen
                  ? styles.arrowOpen
                  : ""
              }`}
            />
          </button>

          {sortOpen && (
            <div className={styles.sortList}>
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`${styles.sortOption} ${
                    sortType === option.value
                      ? styles.selectedOption
                      : ""
                  }`}
                  onClick={() => {
                    setSortType(option.value);
                    setSortOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductFilters;
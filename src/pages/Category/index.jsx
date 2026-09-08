import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ProductCard from "../../components/ProductCard";
import styles from "./Category.module.css";
import Breadcrumbs from "../../components/Breadcrumbs";

function CategoryPage() {
  const { id } = useParams();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [discountedOnly, setDiscountedOnly] = useState(false);

  const [sortOpen, setSortOpen] = useState(false);
  const [sortType, setSortType] = useState("default");

  const sortOptions = [
    { value: "default", label: "by default" },
    { value: "newest", label: "newest" },
    { value: "high-low", label: "price: high-low" },
    { value: "low-high", label: "price: low-high" },
  ];

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setStatus("loading");

        const response = await axios.get(
          `http://localhost:3333/categories/${id}`
        );

        setCategory(response.data.category);
        setProducts(response.data.data);
        setStatus("succeeded");
      } catch (error) {
        console.error("Category loading error:", error);
        setStatus("failed");
      }
    };

    fetchCategory();
  }, [id]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (priceFrom !== "") {
      result = result.filter((product) => {
        const currentPrice =
          product.discont_price !== null
            ? product.discont_price
            : product.price;

        return currentPrice >= Number(priceFrom);
      });
    }

    if (priceTo !== "") {
      result = result.filter((product) => {
        const currentPrice =
          product.discont_price !== null
            ? product.discont_price
            : product.price;

        return currentPrice <= Number(priceTo);
      });
    }

    if (discountedOnly) {
      result = result.filter(
        (product) => product.discont_price !== null
      );
    }

    if (sortType === "newest") {
      result.sort((a, b) => b.id - a.id);
    }

    if (sortType === "high-low") {
      result.sort((a, b) => {
        const priceA =
          a.discont_price !== null ? a.discont_price : a.price;

        const priceB =
          b.discont_price !== null ? b.discont_price : b.price;

        return priceB - priceA;
      });
    }

    if (sortType === "low-high") {
      result.sort((a, b) => {
        const priceA =
          a.discont_price !== null ? a.discont_price : a.price;

        const priceB =
          b.discont_price !== null ? b.discont_price : b.price;

        return priceA - priceB;
      });
    }

    return result;
  }, [
    products,
    priceFrom,
    priceTo,
    discountedOnly,
    sortType,
  ]);

  const currentSortLabel =
    sortOptions.find((option) => option.value === sortType)?.label;

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Failed to load category.</p>;
  }

  return (
    <main className={styles.category}>
<Breadcrumbs
  items={[
    { label: "Main page", to: "/" },
    { label: "Categories", to: "/categories" },
    { label: category?.title },
  ]}
/>

      <h1 className={styles.title}>{category?.title}</h1>

      <div className={styles.filters}>
        <div className={styles.priceFilter}>
          <span className={styles.filterTitle}>Price</span>

          <input
            type="number"
            min="0"
            placeholder="from"
            value={priceFrom}
            onChange={(event) =>
              setPriceFrom(
                event.target.value === ""
                  ? ""
                  : Math.max(0, Number(event.target.value))
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
                  : Math.max(0, Number(event.target.value))
              )
            }
          />
        </div>

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

        <div className={styles.sortFilter}>
          <span>Sorted</span>

          <div className={styles.sort}>
            <button
              type="button"
              className={styles.sortButton}
              onClick={() => setSortOpen((prev) => !prev)}
            >
              {currentSortLabel}

              <span
                className={`${styles.arrow} ${
                  sortOpen ? styles.arrowOpen : ""
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

      <div className={styles.products}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </main>
  );
}

export default CategoryPage;
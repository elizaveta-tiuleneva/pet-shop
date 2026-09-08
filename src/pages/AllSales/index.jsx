import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import Breadcrumbs from "../../components/Breadcrumbs";
import ProductFilters from "../../components/ProductFilters";
import ProductCard from "../../components/ProductCard";

import styles from "./AllSales.module.css";

function AllSalesPage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [sortType, setSortType] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setStatus("loading");

        const response = await axios.get(
          "http://localhost:3333/products/all"
        );

        setProducts(response.data);
        setStatus("succeeded");
      } catch (error) {
        console.error("Sale products loading error:", error);
        setStatus("failed");
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter(
      (product) => product.discont_price !== null
    );

    if (priceFrom !== "") {
      result = result.filter(
        (product) =>
          product.discont_price >= Number(priceFrom)
      );
    }

    if (priceTo !== "") {
      result = result.filter(
        (product) =>
          product.discont_price <= Number(priceTo)
      );
    }

    if (sortType === "newest") {
      result.sort((a, b) => b.id - a.id);
    }

    if (sortType === "high-low") {
      result.sort(
        (a, b) =>
          b.discont_price - a.discont_price
      );
    }

    if (sortType === "low-high") {
      result.sort(
        (a, b) =>
          a.discont_price - b.discont_price
      );
    }

    return result;
  }, [
    products,
    priceFrom,
    priceTo,
    sortType,
  ]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Failed to load sale products.</p>;
  }

  return (
    <div className={styles.allSales}>
      <Breadcrumbs
        items={[
          {
            label: "Main page",
            to: "/",
          },
          {
            label: "All sales",
          },
        ]}
      />

      <h1 className={styles.title}>
        Discounted items
      </h1>

      <ProductFilters
        priceFrom={priceFrom}
        setPriceFrom={setPriceFrom}
        priceTo={priceTo}
        setPriceTo={setPriceTo}
        sortType={sortType}
        setSortType={setSortType}
        showDiscountFilter={false}
      />

      <div className={styles.products}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default AllSalesPage;
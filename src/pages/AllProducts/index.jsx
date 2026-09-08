import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import Breadcrumbs from "../../components/Breadcrumbs";
import ProductFilters from "../../components/ProductFilters";
import ProductCard from "../../components/ProductCard";

import styles from "./AllProducts.module.css";

function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [discountedOnly, setDiscountedOnly] = useState(false);
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
        console.error("Products loading error:", error);
        setStatus("failed");
      }
    };

    fetchProducts();
  }, []);

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
          a.discont_price !== null
            ? a.discont_price
            : a.price;

        const priceB =
          b.discont_price !== null
            ? b.discont_price
            : b.price;

        return priceB - priceA;
      });
    }

    if (sortType === "low-high") {
      result.sort((a, b) => {
        const priceA =
          a.discont_price !== null
            ? a.discont_price
            : a.price;

        const priceB =
          b.discont_price !== null
            ? b.discont_price
            : b.price;

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

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Failed to load products.</p>;
  }

  return (
    <div className={styles.allProducts}>
      <Breadcrumbs
        items={[
          {
            label: "Main page",
            to: "/",
          },
          {
            label: "All products",
          },
        ]}
      />

      <h1 className={styles.title}>All products</h1>

      <ProductFilters
        priceFrom={priceFrom}
        setPriceFrom={setPriceFrom}
        priceTo={priceTo}
        setPriceTo={setPriceTo}
        discountedOnly={discountedOnly}
        setDiscountedOnly={setDiscountedOnly}
        sortType={sortType}
        setSortType={setSortType}
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

export default AllProductsPage;
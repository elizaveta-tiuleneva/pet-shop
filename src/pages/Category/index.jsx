import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ProductCard from "../../components/ProductCard";
import Breadcrumbs from "../../components/Breadcrumbs";
import ProductFilters from "../../components/ProductFilters";

import styles from "./Category.module.css";

function CategoryPage() {
  const { id } = useParams();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [discountedOnly, setDiscountedOnly] = useState(false);
  const [sortType, setSortType] = useState("default");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setStatus("loading");

        const response = await axios.get(
          `https://pet-shop-ls17.onrender.com/categories/${id}`
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
    return <p>Failed to load category.</p>;
  }

  return (
    <div className={styles.category}>
      <Breadcrumbs
        items={[
          {
            label: "Main page",
            to: "/",
          },
          {
            label: "Categories",
            to: "/categories",
          },
          {
            label: category?.title,
          },
        ]}
      />

      <h1 className={styles.title}>
        {category?.title}
      </h1>

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

export default CategoryPage;
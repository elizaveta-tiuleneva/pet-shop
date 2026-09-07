import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../store/productsSlice";
import ProductCard from "../ProductCard";
import SectionHeader from "../SectionHeader";

import styles from "./Sale.module.css";

function Sale() {
  const dispatch = useDispatch();

  const products = useSelector(
    (state) => state.products.items
  );

  const status = useSelector(
    (state) => state.products.status
  );

  const error = useSelector(
    (state) => state.products.error
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const saleProducts = useMemo(() => {
    return products
      .filter((product) => product.discont_price !== null)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  }, [products]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>{error}</p>;
  }

  return (
    <section className={styles.sale}>
      <SectionHeader
        title="Sale"
        linkText="All sales"
        to="/sales"
      />

      <div className={styles.list}>
        {saleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default Sale;
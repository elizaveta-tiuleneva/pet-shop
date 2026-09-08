import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import Breadcrumbs from "../../components/Breadcrumbs";
import Button from "../../ui/Button";
import { addToCart } from "../../store/cartSlice";
import styles from "./Product.module.css";

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState("loading");
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setStatus("loading");

        const response = await axios.get(
          `http://localhost:3333/products/${id}`
        );

        const currentProduct = response.data[0];

        setProduct(currentProduct);

        const categoryResponse = await axios.get(
          `http://localhost:3333/categories/${currentProduct.categoryId}`
        );

        setCategory(categoryResponse.data.category);

        setStatus("succeeded");
      } catch (error) {
        console.error("Product loading error:", error);
        setStatus("failed");
      }
    };

    fetchProduct();
  }, [id]);

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity,
      })
    );
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed" || !product) {
    return <p>Failed to load product.</p>;
  }

  const hasDiscount = product.discont_price !== null;

  const currentPrice = hasDiscount
    ? product.discont_price
    : product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.discont_price) / product.price) * 100
      )
    : null;

  const imageUrl = `http://localhost:3333${product.image}`;

  return (
    <div className={styles.product}>
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
            to: `/categories/${product.categoryId}`,
          },
          {
            label: product.title,
          },
        ]}
      />

      <div className={styles.content}>
        <div className={styles.thumbnails}>
          {[1, 2, 3].map((item) => (
            <div className={styles.thumbnail} key={item}>
              <img
                src={imageUrl}
                alt={`${product.title} ${item}`}
              />
            </div>
          ))}
        </div>

        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={imageUrl}
            alt={product.title}
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>
            {product.title}
          </h1>

          <div className={styles.prices}>
            <span className={styles.currentPrice}>
              ${currentPrice}
            </span>

            {hasDiscount && (
              <>
                <span className={styles.oldPrice}>
                  ${product.price}
                </span>

                <span className={styles.discount}>
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>

          <div className={styles.actions}>
            <div className={styles.counter}>
              <button
                type="button"
                onClick={decreaseQuantity}
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>

            <Button
              variant="product"
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          </div>

          <div className={styles.description}>
            <h2>Description</h2>

            <p className={isExpanded ? styles.expanded : styles.collapsed}>
              {product.description}
            </p>

            <button
              className={styles.readMore}
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? "Read less" : "Read more"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
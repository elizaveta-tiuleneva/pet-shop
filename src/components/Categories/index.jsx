import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../store/categoriesSlice";
import CategoryCard from "../CategoryCard";
import styles from "./Categories.module.css";

function Categories() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.items);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section className={styles.categories}>
<div className={styles.header}>
  <h2 className={styles.title}>Categories</h2>

  <div className={styles.navigation}>
    <div className={styles.line}></div>

    <Link to="/categories" className={styles.allCategories}>
      All categories
    </Link>
  </div>
</div>

      <div className={styles.list}>
        {categories.slice(0, 4).map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            title={category.title}
            image={category.image}
          />
        ))}
      </div>
    </section>
  );
}

export default Categories;

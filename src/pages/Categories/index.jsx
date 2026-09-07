import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCategories } from "../../store/categoriesSlice";
import CategoryCard from "../../components/CategoryCard";

import styles from "./Categories.module.css";

function Categories() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.items);

  const status = useSelector((state) => state.categories.status);

  const error = useSelector((state) => state.categories.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>{error}</p>;
  }

  return (
    <main className={styles.categories}>
      <div className={styles.breadcrumbs}>
        <span>Main page</span>
        <span>Categories</span>
      </div>

      <h1 className={styles.title}>Categories</h1>

      <div className={styles.list}>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            title={category.title}
            image={category.image}
          />
        ))}
      </div>
    </main>
  );
}

export default Categories;

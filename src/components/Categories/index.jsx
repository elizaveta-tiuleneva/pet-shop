import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/categoriesSlice";
import CategoryCard from "../CategoryCard";
import styles from "./Categories.module.css";
import SectionHeader from "../SectionHeader";


function Categories() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.items);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section className={styles.categories}>
      <SectionHeader
        title="Categories"
        linkText="All categories"
        to="/categories"
      />

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

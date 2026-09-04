import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

import logo from "../../assets/icons/logo.svg";
import shoppingBag from "../../assets/icons/shopping-bag.svg";

function Header() {
  const cartCount = 0;

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        <img src={logo} alt="Pet Shop" />
      </NavLink>

      <nav className={styles.nav}>
        <NavLink to="/">Main Page</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/products">All products</NavLink>
        <NavLink to="/sales">All sales</NavLink>
      </nav>

      <NavLink to="/cart" className={styles.cart}>
        {cartCount > 0 && (
          <span className={styles.cartCount}>{cartCount}</span>
        )}

        <img src={shoppingBag} alt="Shopping cart" />
      </NavLink>
    </header>
  );
}

export default Header;
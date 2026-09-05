import styles from "./Hero.module.css";
import heroImage from "../../assets/img/hero.png";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className={styles.hero}>
      <img className={styles.image} src={heroImage} alt="Pets" />

      <div className={styles.content}>
        <h1 className={styles.title}>Amazing Discounts on Pets Products!</h1>

        <Link to="/sales">
          <Button variant="hero">Check out</Button>
        </Link>
      </div>
    </section>
  );
}

export default Hero;

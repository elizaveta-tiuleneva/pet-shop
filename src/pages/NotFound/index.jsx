import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import notFoundImage from "../../assets/img/404.png";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <section className={styles.notFound}>
      <img
        className={styles.image}
        src={notFoundImage}
        alt="404 Page Not Found"
      />

      <div className={styles.content}>
        <div className={styles.text}>
          <h1 className={styles.title}>Page Not Found</h1>

          <p className={styles.description}>
            We’re sorry, the page you requested could not be found.
            <br />
            Please go back to the homepage.
          </p>
        </div>

        <Link to="/" className={styles.link}>
          <Button variant="hero">Go Home</Button>
        </Link>
      </div>
    </section>
  );
}

export default NotFound;

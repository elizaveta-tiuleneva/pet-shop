import styles from "./Footer.module.css";

import instagram from "../../assets/icons/instagram.svg";
import whatsapp from "../../assets/icons/whatsapp.svg";

function Footer() {
  return (
    <footer className={styles.footer}>
      <h2>Contact</h2>

      <div className={styles.contacts}>
        <div className={styles.contactItem}>
          <span>Phone</span>
          <a href="tel:+493091588492">+49 30 915-88492</a>
        </div>

        <div className={styles.contactItem}>
          <span>Socials</span>

          <div className={styles.socialIcons}>
            <a href="#">
              <img src={instagram} alt="Instagram" />
            </a>

            <a href="#">
              <img src={whatsapp} alt="WhatsApp" />
            </a>
          </div>
        </div>

        <div className={styles.contactItem}>
          <span>Address</span>
          <p>
            Wallstraße 9-13, 10179 Berlin,
            <br />
            Deutschland
          </p>
        </div>

        <div className={styles.contactItem}>
          <span>Working Hours</span>
          <p>24 hours a day</p>
        </div>
      </div>

      <div className={styles.map}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.231626737637!2d13.401898312559608!3d52.51114713676801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e27db4748a5%3A0x1d538c01013c2c7!2zV2FsbHN0cmHDn2UgOS0xMywgMTAxNzkgQmVybGluLCDrj4Xsnbw!5e0!3m2!1sko!2skr!4v1788514460272!5m2!1sko!2skr"
          title="Pet Shop location"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
    </footer>
  );
}

export default Footer;

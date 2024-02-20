import styles from "./Contact.module.css";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <section className={styles.section}>
      <div className="welcome card column">
        <h1>Welcome!</h1>

        <p>
          <Link to="/messages">View your messages</Link>
        </p>

        <p>
          <Link to="/users">View User Settings</Link>
        </p>
      </div>
    </section>
  );
};

export default Contact;

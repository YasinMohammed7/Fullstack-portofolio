import useAuth from "../../hooks/useAuth";
import styles from "./Contact.module.css";
import { Link } from "react-router-dom";

const Contact = () => {
  const { username, isAdmin } = useAuth();

  return (
    <section className={styles.section}>
      <div className="welcome card column">
        <h1>Welcome! {username}</h1>

        <p>
          <Link to="/messages">View your messages</Link>
        </p>

        {isAdmin && (
          <p>
            <Link to="/users">View User Settings</Link>
          </p>
        )}

        <p>
          <Link to="/users/new">Add new user</Link>
        </p>
        <p>
          <Link to="/messages/new">Add new message</Link>
        </p>
      </div>
    </section>
  );
};

export default Contact;

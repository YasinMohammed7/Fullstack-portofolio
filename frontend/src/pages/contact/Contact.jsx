import MessagesList from "../../components/features/messages/MessagesList";
import NewMessage from "../../components/features/messages/NewMessage";
import useAuth from "../../hooks/useAuth";
import styles from "./Contact.module.css";
import { Link } from "react-router-dom";

const Contact = () => {
  const { username, isAdmin } = useAuth();

  return (
    <section className={styles.section}>
      <div className="welcome card column">
        <h1>{`Welcome, ${username}`}</h1>

        <NewMessage />

        <MessagesList />

        {username && isAdmin && (
          <p>
            <Link to="/users">View User Settings</Link>
          </p>
        )}
      </div>
    </section>
  );
};

export default Contact;

import { useSelector } from "react-redux";
import MessagesList from "../../components/features/messages/MessagesList";
import NewMessage from "../../components/features/messages/NewMessage";
import useAuth from "../../hooks/useAuth";
import styles from "./Contact.module.css";
import { Link } from "react-router-dom";
import { selectAllMessages } from "../../components/features/messages/messagesApiSlice";

const Contact = () => {
  const { username } = useAuth();

  const messages = useSelector(selectAllMessages);

  const userMessage = messages.find(
    (message) => message.user.username === username
  );

  return (
    <section className={styles.section}>
      <div className="welcome card column">
        <h1>{`Welcome, ${username}`}</h1>

        {!userMessage && <NewMessage />}

        <MessagesList />

        {username && (
          <p>
            <Link to="/users">View User Settings</Link>
          </p>
        )}
      </div>
    </section>
  );
};

export default Contact;

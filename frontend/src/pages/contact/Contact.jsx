import ContactForm from "../../components/ContactForm";
import { Messages } from "../../components/Messages";
import styles from "./Contact.module.css";

const Contact = ({ users, createUser, newUser, setNewUser }) => {
  return (
    <section className={styles.section}>
      <ContactForm
        createUser={createUser}
        newUser={newUser}
        setNewUser={setNewUser}
      />
      <Messages users={users} />
    </section>
  );
};

export default Contact;

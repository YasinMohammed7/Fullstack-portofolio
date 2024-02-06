import styles from "../pages/contact/Contact.module.scss";

const ContactForm = ({ createUser, newUser, setNewUser }) => {
  return (
    <form className={`card column ${styles.form}`} onSubmit={createUser}>
      <legend>
        <h2>
          Lets work <span>together</span>
        </h2>
      </legend>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={newUser.name}
        required
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={newUser.email}
        required
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <textarea
        placeholder="Message"
        name="message"
        value={newUser.message}
        required
        onChange={(e) => setNewUser({ ...newUser, message: e.target.value })}
      />
      <button className="button" type="submit">
        Send
      </button>
    </form>
  );
};

export default ContactForm;

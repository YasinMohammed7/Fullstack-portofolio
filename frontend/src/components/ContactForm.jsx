import styles from "../pages/contact/Contact.module.scss";

const ContactForm = ({}) => {
  return (
    <form className={`card column ${styles.form}`}>
      <legend>
        <h2>
          Lets work <span>together</span>
        </h2>
      </legend>
      <input type="text" placeholder="Name" name="name" required />
      <input type="text" placeholder="Email" name="email" required />
      <textarea placeholder="Message" name="message" required />
      <button className="button" type="submit">
        Send
      </button>
    </form>
  );
};

export default ContactForm;

import React from "react";
import styles from "../pages/contact/Contact.module.scss";

export const Messages = ({ users }) => {
  return (
    <div>
      <h3 className={styles.h3}>Your messages</h3>
      {users.map((user) => (
        <div className={`card column ${styles.messages}`} key={user.id}>
          <div>Name: {user.name}</div>
          <p>Message: {user.message}</p>
        </div>
      ))}
    </div>
  );
};

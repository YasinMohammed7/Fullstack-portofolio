import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewUserMutation } from "./usersApiSlice";
import { ROLES } from "../../../config/roles";
import styles from "../../../pages/contact/Contact.module.scss";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["User"]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/users");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value
    );
    setRoles(values);
  };

  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option className={`card ${styles.options}`} key={role} value={role}>
        {role}
      </option>
    );
  });

  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const content = (
    <form className={`card column ${styles.form}`} onSubmit={onSaveUserClicked}>
      {isError && <p className="errorMsg">{error?.data?.message}</p>}
      <legend>
        <h2>
          Lets work <span>together</span>
        </h2>
      </legend>
      <label htmlFor="username">
        Username: <span className="nowrap">[3-20 letters]</span>
      </label>
      <input
        className={` ${validUserClass}`}
        id="username"
        name="username"
        type="text"
        autoComplete="off"
        value={username}
        onChange={onUsernameChanged}
        required
      />

      <label htmlFor="password">
        Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
      </label>
      <input
        className={` ${validPwdClass}`}
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={onPasswordChanged}
        required
      />
      {/* 
      <label htmlFor="roles">ASSIGNED ROLES:</label>
      <select
        id="roles"
        name="roles"
        className={`card ${validRolesClass}`}
        multiple={true}
        size="2"
        value={roles}
        onChange={onRolesChanged}
        required
      >
        {options}
      </select> */}

      <button className="button" title="Save" disabled={!canSave}>
        Create Account
      </button>
    </form>
  );
  return content;
};

export default NewUserForm;

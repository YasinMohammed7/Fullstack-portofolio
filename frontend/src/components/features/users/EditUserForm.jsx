import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../../config/roles";
import styles from "../../../pages/contact/Contact.module.scss";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({ id: user.id, username, password, roles });
    } else {
      await updateUser({ id: user.id, username, roles });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  let canSave;
  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass =
    password && !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <form
      className={`card column ${styles.form}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <legend>
        <h2>
          Lets work <span>together</span>
        </h2>
      </legend>
      {(isError || isDelError) && <p className="errorMsg">{errContent}</p>}
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
      />

      <label htmlFor="password">
        Password: <span className="nowrap">[empty = no change]</span>{" "}
        <span className="nowrap">[4-12 chars incl. !@#$%]</span>
      </label>
      <input
        className={` ${validPwdClass}`}
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={onPasswordChanged}
      />

      {/* <label className="form__label" htmlFor="roles">
        ASSIGNED ROLES:
      </label>
      <select
        id="roles"
        name="roles"
        className={`card ${validRolesClass}`}
        multiple={true}
        size="2"
        value={roles}
        onChange={onRolesChanged}
      >
        {options}
      </select> */}

      <button
        className="button"
        onClick={onSaveUserClicked}
        title="Save"
        disabled={!canSave}
      >
        Save changes
      </button>
      <button className="button" title="Delete" onClick={onDeleteUserClicked}>
        Delete
      </button>
    </form>
  );

  return content;
};

export default EditUserForm;

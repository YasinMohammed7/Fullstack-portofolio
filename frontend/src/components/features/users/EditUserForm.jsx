import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import styles from "../../../pages/contact/Contact.module.scss";
import { FaCheck, FaTimes } from "react-icons/fa";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
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
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [roles, setRoles] = useState(user.roles);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

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

  const onSaveUserClicked = async () => {
    if (password) {
      await updateUser({ id: user.id, username, password, roles });
    } else {
      await updateUser({ id: user.id, username, roles });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  let canSave;
  if (password) {
    canSave =
      [roles.length, validUsername, validPassword, validMatch].every(Boolean) &&
      !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

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
      {(isError || isDelError) && (
        <p aria-live="assertive" className="errorMsg">
          {errContent}
        </p>
      )}
      <label htmlFor="username">
        Username: {validUsername && <FaCheck />}
        {!validUsername && username && <FaTimes />}
      </label>
      <input
        id="username"
        name="username"
        type="text"
        autoComplete="off"
        aria-invalid={validUsername ? "false" : "true"}
        aria-describedby="uidnote"
        value={username}
        onChange={onUsernameChanged}
        onFocus={() => setUsernameFocus(true)}
        onBlur={() => setUsernameFocus(false)}
      />
      {username && usernameFocus && !validUsername && (
        <p id="uidnote" className="instructions">
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>
      )}

      <label htmlFor="password">
        Password: {validPassword && <FaCheck />}
        {!validPassword && password && <FaTimes />}{" "}
        <span className="nowrap">[empty = no change]</span>{" "}
      </label>
      <input
        aria-invalid={validPassword ? "false" : "true"}
        aria-describedby="pwdnote"
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={onPasswordChanged}
        onFocus={() => setPasswordFocus(true)}
        onBlur={() => setPasswordFocus(false)}
      />
      {passwordFocus && !validPassword && (
        <p id="pwdnote" className="instructions">
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          <br />
          character. Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>
          <span aria-label="at symbol">@</span>
          <span aria-label="hashtag">#</span>
          <span aria-label="dollar sign">$</span>
          <span aria-label="percent">%</span>
        </p>
      )}

      <label htmlFor="confirm-password">
        Confirm password: {validMatch && matchPassword && <FaCheck />}
        {!validMatch && matchPassword && <FaTimes />}
      </label>
      <input
        aria-invalid={validMatch ? "false" : "true"}
        aria-describedby="confirmnote"
        id="confirm-password"
        name="confirm-password"
        type="password"
        value={matchPassword}
        onChange={(e) => setMatchPassword(e.target.value)}
        onFocus={() => setMatchFocus(true)}
        onBlur={() => setMatchFocus(false)}
      />
      {matchFocus && !validMatch && (
        <p id="confirmnote" className="instructions">
          Must match the first password field.
        </p>
      )}

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

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import styles from "../../../pages/contact/Contact.module.scss";
import usePersist from "../../../hooks/usePersist";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/contact");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  if (isLoading) return <p>Loading...</p>;

  const content = (
    <form className={`card column ${styles.form}`} onSubmit={handleSubmit}>
      <legend>
        <h2>
          Lets work <span>together</span>
        </h2>
      </legend>
      {errMsg && (
        <p className="errorMsg" ref={errRef} aria-live="assertive">
          {errMsg}
        </p>
      )}
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        name="username"
        type="text"
        ref={userRef}
        autoComplete="off"
        value={username}
        onChange={handleUserInput}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={handlePwdInput}
        required
      />

      <label htmlFor="persist">
        <input
          type="checkbox"
          id="persist"
          onChange={handleToggle}
          checked={persist}
        />
        Remember me
      </label>

      <button className="button">Sign in</button>
      <p>Or</p>
      <button className="button" onClick={() => navigate("/new")}>
        Sign Up
      </button>
    </form>
  );

  return content;
};

export default Login;

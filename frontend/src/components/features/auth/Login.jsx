import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import styles from "../../../pages/contact/Contact.module.scss";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

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

  if (isLoading) return <p>Loading...</p>;

  const content = (
    <>
      {errMsg && (
        <p className="errorMsg" ref={errRef} aria-live="assertive">
          {errMsg}
        </p>
      )}
      <form className={`card column ${styles.form}`} onSubmit={handleSubmit}>
        <legend>
          <h2>
            Lets work <span>together</span>
          </h2>
        </legend>
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

        <button className="button">Sign in</button>
      </form>
    </>
  );

  return content;
};

export default Login;

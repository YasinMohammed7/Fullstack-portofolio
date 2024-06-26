import { Link, Outlet } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import usePersist from "../../../hooks/usePersist";
import { selectCurrentToken } from "./authSlice";
import { useRefreshMutation } from "./authApiSlice";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");

        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (persist && !token) verifyRefreshToken();
    }

    return () => (effectRan.current = true);
  }, []);

  let content;
  if (!persist) {
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    console.log("loading");
    content = <p>Loading...</p>;
  } else if (isError) {
    console.log("error");
    content = <Outlet />;
  } else if (isSuccess && trueSuccess) {
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log("token and uninitialized");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;

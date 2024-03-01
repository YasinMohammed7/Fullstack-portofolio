import { useState, useEffect } from "react";
import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import Hamburger from "../../components/Hamburger";
import { useSendLogoutMutation } from "../../components/features/auth/authApiSlice";

const navItems = [
  {
    id: 1,
    path: "/",
    text: "Home",
  },
  {
    id: 2,
    path: "/about",
    text: "About",
  },
  {
    id: 3,
    path: "/projects",
    text: "Projects",
  },
  {
    id: 4,
    path: "/contact",
    text: "Contact",
  },
  {
    id: 5,
    path: "/login",
    text: "Login",
  },
];

const Header = ({ width }) => {
  const navigate = useNavigate();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging Out...</p>;

  if (isError) return <p>{error?.data?.message}</p>;

  const logOutButton = (
    <button className="button" title="logout" onClick={sendLogout}>
      Log Out
    </button>
  );

  return (
    <nav>
      <div className="logo" data-testid="logo">
        <Link to="/">
          <h2>YM</h2>
        </Link>
      </div>
      <AnimatePresence>
        {(open || width > 600) && (
          <motion.ul
            initial={width > 600 ? {} : { scaleY: 0 }}
            animate={width > 600 ? {} : { scaleY: 1 }}
            exit={width > 600 ? {} : { scaleY: 0 }}
            transition={{
              duration: 0.3,
            }}
            className="menu"
            data-testid="menu"
          >
            {navItems.map(({ path, id, text }) => (
              <motion.li
                initial={
                  width > 600 ? {} : { opacity: 0, y: 70, filter: "blur(20px)" }
                }
                animate={
                  width > 600 ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                }}
                key={id}
                className="menu-item"
              >
                <Link to={path} aria-label={`Go to ${text}`}>
                  <h5>{text}</h5>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      {logOutButton}
      {width < 600 && <Hamburger open={open} handleClick={handleClick} />}
    </nav>
  );
};
export default Header;

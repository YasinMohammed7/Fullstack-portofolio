import { Routes, Route } from "react-router";
import Home from "./pages/home/Home";
import { useEffect, useState } from "react";
import useWindowSize from "./hooks/useWindowSize";
import Layout from "./components/Layout";
import About from "./pages/about/About";
import Projects from "./pages/projects/Projects";
import Contact from "./pages/contact/Contact";
import axios from "axios";

const App = () => {
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { width } = useWindowSize();
  const API_URL = "http://localhost:4000";

  useEffect(() => {
    const calculateExperience = () => {
      const startDate = new Date("01-01-2023");
      const currentYear = new Date().getFullYear();
      const startYear = startDate.getFullYear();
      const years = currentYear - startYear;
      setYearsOfExperience(years);
    };

    calculateExperience();

    const intervalId = setInterval(
      calculateExperience,
      365.25 * 24 * 60 * 60 * 1000
    );

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users`);
        setUsers(response.data.reverse());
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchUsers();
  }, []);

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/users`, newUser);
      setUsers([response.data, ...users]);
      setNewUser({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Layout width={width} />}>
        <Route index element={<Home yearsOfExperience={yearsOfExperience} />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route
          path="contact"
          element={
            <Contact
              users={users}
              createUser={createUser}
              newUser={newUser}
              setNewUser={setNewUser}
            />
          }
        />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Route>
    </Routes>
  );
};

export default App;

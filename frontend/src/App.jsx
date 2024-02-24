import { Routes, Route } from "react-router";
import Home from "./pages/home/Home";
import { useEffect, useState } from "react";
import useWindowSize from "./hooks/useWindowSize";
import Layout from "./components/Layout";
import About from "./pages/about/About";
import Projects from "./pages/projects/Projects";
import Contact from "./pages/contact/Contact";
import UsersList from "./components/features/users/UsersList";
import MessagesList from "./components/features/messages/MessagesList";
import EditUser from "./components/features/users/EditUser";
import NewUserForm from "./components/features/users/NewUserForm";
import EditMessage from "./components/features/messages/EditMessage";
import NewMessageForm from "./components/features/messages/NewMessageForm";
import Prefetch from "./components/features/auth/Prefetch";

const App = () => {
  const [yearsOfExperience, setYearsOfExperience] = useState(0);

  const { width } = useWindowSize();

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

  return (
    <Routes>
      <Route path="/" element={<Layout width={width} />}>
        <Route index element={<Home yearsOfExperience={yearsOfExperience} />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
        <Route element={<Prefetch />}>
          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path=":id" element={<EditUser />} />
            <Route path="new" element={<NewUserForm />} />
          </Route>
          <Route path="messages">
            <Route index element={<MessagesList />} />
            <Route path=":id" element={<EditMessage />} />
            <Route path="new" element={<NewMessageForm />} />
          </Route>
        </Route>
        <Route path="*" element={<h1>Page not found</h1>} />
      </Route>
    </Routes>
  );
};

export default App;

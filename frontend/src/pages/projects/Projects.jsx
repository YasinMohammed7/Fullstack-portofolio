import React from "react";
import todoImg from "../../assets/TodoListproject.png";
import converterImg from "../../assets/converterProject.png";
import blogImg from "../../assets/projectImg.png";
import styles from "./Projects.module.css";
import Project from "../../components/Project";

export const projects = [
  {
    id: 1,
    title: "Todo List",
    img: todoImg,
    projectPath: "https://stunning-lamington-05f71d.netlify.app/",
    codePath: "https://github.com/YasinMohammed7/React-todo-list",
  },
  {
    id: 2,
    title: "Roman Converter",
    img: converterImg,
    projectPath: "https://taupe-sorbet-9b0d3c.netlify.app/",
    codePath: "https://github.com/YasinMohammed7/React-roman-converter",
  },
  {
    id: 3,
    title: "Blog",
    img: blogImg,
    projectPath: "https://magnificent-pika-e1ba95.netlify.app/",
    codePath: "https://github.com/YasinMohammed7/React-Blog",
  },
];
const Projects = () => {
  return (
    <section className={styles.section} data-testid="section">
      <h1>My projects</h1>
      {projects.map((project) => (
        <Project key={project.id} {...project} spanStyle={styles.code} />
      ))}
    </section>
  );
};

export default Projects;

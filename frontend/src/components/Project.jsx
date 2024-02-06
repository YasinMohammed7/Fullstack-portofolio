import { Link } from "react-router-dom";

const Project = ({ projectPath, codePath, img, title, spanStyle }) => {
  return (
    <figure className="card column">
      <img src={img} alt="project" />
      <figcaption>
        <span className={spanStyle}>{title}</span>
        <Link className="button" to={projectPath}>
          Project
        </Link>
        <Link className="button" to={codePath}>
          Code
        </Link>
      </figcaption>
    </figure>
  );
};

export default Project;

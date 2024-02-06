import IconPath from "../assets/icon.svg";

/**
 * Renders a card with optional image, title, subtitle, description, and icon based on the provided props.
 * @param {Object} props - The props object.
 * @param {string} props.title - The title of the card.
 * @param {string} props.subtitle - The subtitle of the card.
 * @param {string} props.desc - The description of the card.
 * @param {string} props.image - The path to the image to be displayed in the card.
 * @param {string} props.direction - The direction of the card layout, either "row" or "column".
 * @param {boolean} props.smallcard - Whether to display a small card or not.
 * @param {ReactNode} props.children - Custom content to be displayed in the card.
 * @param {boolean} props.showIcon - Whether to display an icon or not.
 * @param {boolean} props.showInfo - Whether to display the title, subtitle, and description or not.
 * @param {string} props.altText - The alt for the image.
 * @returns {JSX.Element} The rendered card component.
 */
const Card = ({
  title,
  subtitle,
  desc,
  image,
  direction,
  smallcard,
  children,
  showIcon,
  showInfo,
  altText,
  cls,
}) => {
  const renderImage = () => {
    if (image) {
      return (
        <figure className="image">
          <img src={image} alt={altText} />
        </figure>
      );
    }
    return children;
  };

  const renderTitle = () => {
    if (showInfo) {
      return (
        <div className="title">
          {subtitle && <h4>{subtitle}</h4>}
          {smallcard ? <h3>{title}</h3> : <h1>{title}</h1>}
          {desc && <p>{desc}</p>}
        </div>
      );
    }
    return null;
  };

  const renderIcon = () => {
    if (showIcon) {
      return (
        <div className="icon">
          <img src={IconPath} alt="icon" />
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`card ${cls ? cls : ""} ${
        direction === "row" ? "row" : "column"
      }`}
    >
      {renderImage()}
      {renderTitle()}
      {renderIcon()}
    </div>
  );
};

export default Card;

Card.defaultProps = {
  showIcon: true,
  showInfo: true,
};

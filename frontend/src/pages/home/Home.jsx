import Card from "../../components/Card";
import myImg from "../../assets/myImage.jpg";
import { Link } from "react-router-dom";
import "./home.scss";
import aboutImg from "../../assets/aboutMeImg.jpg";
import PortfolioImg from "../../assets/projectImg.png";
import icon2 from "../../assets/icon2.png";
import { projects } from "../projects/Projects";

const Home = ({ yearsOfExperience }) => {
  const node = {
    children1: ["HTML", "CSS", "JavaScript", "React", "SCSS"],
    children2: [
      {
        path: "https://www.linkedin.com/in/yasin-mohammed-b39840275/",
        socialMedia: "LinkedIn",
      },
      { path: "https://github.com/YasinMohammed7", socialMedia: "Github" },
    ],
    children3: [
      {
        num: yearsOfExperience,
        text: `${yearsOfExperience === 1 ? "Year" : "Years"} of experience`,
      },
      { num: projects.length, text: "Projects" },
    ],
  };

  const cardData = {
    firstSection: [
      {
        id: 1,
        path: "/about",
        title: "Mohammed Yasin",
        subtitle: "Frontend developer",
        desc: "I am a frontend developer based in Bucharest, Romania",
        image: myImg,
        direction: "row",
      },
      {
        id: 2,
        path: "/about",
        title: "Credentials",
        subtitle: "More about me",
        desc: "",
        image: aboutImg,
        direction: "column",
        smallcard: true,
      },
      {
        id: 3,
        path: "/projects",
        title: "Portfolio",
        subtitle: "See in action",
        desc: "",
        image: PortfolioImg,
        direction: "column",
        smallcard: true,
      },
    ],

    secondSection: [
      {
        id: 1,
        title: "Skills",
        subtitle: "What I know",
        smallcard: true,
        cardChildren: node.children1.map((element, index) => (
          <h4 key={index}>{element}</h4>
        )),
        showIcon: false,
      },
      {
        id: 2,
        title: "Stay with me",
        subtitle: "Social Media",
        smallcard: true,
        cardChildren: node.children2.map((element, index) => (
          <Link to={element.path} key={index}>
            <div className="card">{element.socialMedia}</div>
          </Link>
        )),
        showIcon: false,
      },
    ],

    thirdSection: [
      {
        path: "/projects",
        id: 1,
        showInfo: false,
        showIcon: false,
        direction: "row",
        cardChildren: node.children3.map((element, index) => (
          <div key={index} className="card column">
            <h1>{element.num}</h1>
            <h4>{element.text}</h4>
          </div>
        )),
      },
      {
        path: "/contact",
        id: 2,
        showInfo: false,
        showIcon: false,
        cls: "contact-card",
        cardChildren: (
          <>
            <figure className="icon2">
              <img src={icon2} alt="Icon" />
            </figure>

            <h3>Lets</h3>
            <h3>
              Work<span>together</span>
            </h3>
          </>
        ),
      },
    ],
  };

  return (
    <>
      <section className="section-1">
        {cardData.firstSection.map((card) => (
          <div className={`card-${card.id}`} key={card.id}>
            <Link to={card.path}>
              <Card {...card} />
            </Link>
          </div>
        ))}
      </section>

      <section className="section-2">
        {cardData.secondSection.map(
          ({ id, title, subtitle, smallcard, cardChildren, showIcon }) => (
            <Card
              key={id}
              title={title}
              subtitle={subtitle}
              smallcard={smallcard}
              showIcon={showIcon}
            >
              <div className={`card-children-${id}`}>{cardChildren}</div>
            </Card>
          )
        )}
      </section>

      <section className="section-3">
        {cardData.thirdSection.map(
          ({ id, showInfo, showIcon, direction, cardChildren, cls, path }) => (
            <Link key={id} to={path}>
              <Card
                cls={cls}
                showIcon={showIcon}
                showInfo={showInfo}
                direction={direction}
              >
                {cardChildren}
              </Card>
            </Link>
          )
        )}
      </section>
    </>
  );
};

export default Home;

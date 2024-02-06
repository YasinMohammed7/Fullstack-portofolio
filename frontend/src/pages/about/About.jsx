import React from "react";
import styles from "./About.module.scss";
import Card from "../../components/Card";
import passionImg from "../../assets/passionImg.jpg";
import icon2 from "../../assets/icon2.png";
import Experience from "../../components/Experience";
import Education from "../../components/Education";

const dataCards = [
  {
    id: 1,
    title: "Experience",
    image: false,
    children: (
      <Experience year="2023-2024" job="Frontend developer" company="At Home" />
    ),
    cls: styles.experience,
    showIcon: false,
  },
  {
    id: 2,
    title: "Education",
    image: false,
    children: (
      <Education
        year="2016-2020"
        school="Liceul Teoretic C.A Rosetti"
        degree="Bacalaureat Diploma"
      />
    ),
    cls: styles.education,
    showIcon: false,
  },
];

const About = () => {
  return (
    <section className={styles.section}>
      <Card
        cls={styles.image}
        image={passionImg}
        showIcon={false}
        showInfo={false}
        altText="Passion image"
      />
      <h1 className={styles.title}>Self Summary</h1>
      <Card
        cls={styles.aboutMe}
        image={icon2}
        showIcon={false}
        altText="Icon"
        title="Description"
        desc="My name is Yasin, I am 23 years old and I live in
      Bucharest, Romania.
      I am a front-end developer with a passion for creating engaging and user-friendly web experiences. Seeking a challenging position that allows me to utilize my expertise in frontend technologies and design principles to contribute to the development of innovative and visually appealing websites and applications. 
      One of my hobbies is to play football, it makes me creative and gives me motivation to practice coding for making progress."
      />
      {dataCards.map(({ id, image, cls, showIcon, children, title }) => (
        <Card key={id} image={image} cls={cls} showIcon={showIcon}>
          <h2>{title}</h2>
          {children}
        </Card>
      ))}
    </section>
  );
};

export default About;

import React, { useState } from "react";
import { BiDownload } from "react-icons/bi";
import { VscMail } from "react-icons/vsc";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FiGithub } from "react-icons/fi";
import "./footer.scss";
import FooterList from "../../components/FooterList";

const Footer = ({ width }) => {
  const [open, setOpen] = useState({
    keepConnected: false,
    contactInfo: false,
  });

  const year = new Date().getFullYear();

  const handleClick = (listName) => {
    setOpen({
      ...open,
      [listName]: !open[listName],
    });
  };

  const footerLists = {
    firstList: [
      {
        id: 1,
        url: "https://www.linkedin.com/in/yasin-mohammed-b39840275/",
        icon: <AiOutlineLinkedin />,
        text: "Check my profile",
      },
      {
        id: 2,
        url: "https://github.com/YasinMohammed7",
        icon: <FiGithub />,
        text: "See my projects",
      },
    ],
    secondList: [
      {
        id: 1,
        url: "src/assets/CV.YasinMohammed.pdf",
        icon: <BiDownload />,
        text: "Download CV",
        download: true,
      },
      {
        id: 2,
        url: "mailto:mohammedyasinym16720@gmail.com",
        icon: <VscMail />,
        text: "Send a mail",
        download: false,
      },
      {
        id: 3,
        url: "tel:+40730319951",
        icon: <BsTelephone />,
        text: "+40730319951",
        download: false,
      },
    ],
  };

  return (
    <>
      <footer>
        <FooterList
          width={width}
          title="Keep connected"
          handleClick={() => handleClick("keepConnected")}
          isOpen={open.keepConnected}
          items={footerLists.firstList}
        />
        <FooterList
          width={width}
          title="Contact information"
          handleClick={() => handleClick("contactInfo")}
          isOpen={open.contactInfo}
          items={footerLists.secondList}
        />
      </footer>
      <p className="copyright">
        &copy; {year} All Rights Reserved. Created by me
      </p>
    </>
  );
};

export default Footer;

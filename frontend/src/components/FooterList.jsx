import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

const FooterList = ({ width, title, handleClick, isOpen, items }) => {
  return (
    <div className="ft-list">
      <h3>
        {title}
        {width < 500 ? (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <IoIosArrowDown onClick={handleClick} />
          </motion.div>
        ) : null}
      </h3>
      <AnimatePresence>
        {width > 500 ? (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <a href={item.url} download={item.download}>
                  {item.icon} {item.text}
                </a>
              </li>
            ))}
          </ul>
        ) : isOpen ? (
          <ul>
            {items.map((item) => (
              <motion.li
                initial={{ x: -200 * item.id }}
                animate={{ x: 0 }}
                exit={{ x: -200 * item.id }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                key={item.id}
              >
                <a href={item.url} download={item.download}>
                  {item.icon} {item.text}
                </a>
              </motion.li>
            ))}
          </ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default FooterList;

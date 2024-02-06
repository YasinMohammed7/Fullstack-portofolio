import React from "react";
import { useEffect } from "react";
import { useAnimate } from "framer-motion";

const Hamburger = ({ handleClick, open }) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate([
      [
        "path.top",
        { d: open ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
        { at: "<" },
      ],
      ["path.middle", { opacity: open ? 0 : 1 }, { at: "<" }],
      [
        "path.bottom",
        { d: open ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
        { at: "<" },
      ],
    ]);
  }, [open]);

  return (
    <div ref={scope} className="hamburger" data-testid="hamburger">
      <button
        className="button"
        data-testid="hamburger-button"
        onClick={handleClick}
      >
        <svg width="23" height="18" viewBox="0 0 23 18">
          <path
            fill="transparent"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            d="M 2 2.5 L 20 2.5"
            className="top"
          />
          <path
            fill="transparent"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            d="M 2 9.423 L 20 9.423"
            opacity="1"
            className="middle"
          />
          <path
            fill="transparent"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            d="M 2 16.346 L 20 16.346"
            className="bottom"
          />
        </svg>
      </button>
    </div>
  );
};

export default Hamburger;

import React from "react";
import styles from "../sass/viewportControlButtons.module.scss";
import {
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight,
  HiChevronUp,
} from "react-icons/hi";

interface ViewportControlButtonsProps {
  startScrollingUp: () => void;
  startScrollingRight: () => void;
  startScrollingDown: () => void;
  startScrollingLeft: () => void;
  stopScrolling: () => void;
}

const ViewportControlButtons: React.FC<ViewportControlButtonsProps> = ({
  startScrollingUp,
  startScrollingRight,
  startScrollingDown,
  startScrollingLeft,
  stopScrolling,
}) => {
  return (
    <>
      <button
        className={`${styles.scrollButton} ${styles.scrollButtonUp}`}
        onMouseDown={startScrollingUp}
        onMouseUp={stopScrolling}
        onMouseLeave={stopScrolling}
      >
        <HiChevronUp className={styles.arrowButton} />
      </button>
      <button
        className={`${styles.scrollButton} ${styles.scrollButtonRight}`}
        onMouseDown={startScrollingRight}
        onMouseUp={stopScrolling}
        onMouseLeave={stopScrolling}
      >
        <HiChevronRight className={styles.arrowButton} />
      </button>
      <button
        className={`${styles.scrollButton} ${styles.scrollButtonDown}`}
        onMouseDown={startScrollingDown}
        onMouseUp={stopScrolling}
        onMouseLeave={stopScrolling}
      >
        <HiChevronDown className={styles.arrowButton} />
      </button>
      <button
        className={`${styles.scrollButton} ${styles.scrollButtonLeft}`}
        onMouseDown={startScrollingLeft}
        onMouseUp={stopScrolling}
        onMouseLeave={stopScrolling}
      >
        <HiChevronLeft className={styles.arrowButton} />
      </button>
    </>
  );
};

export default ViewportControlButtons;

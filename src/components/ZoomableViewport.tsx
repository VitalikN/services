import React, { useState } from "react";
import styles from "../sass/zoomableViewport.module.scss";

import { FaLocationArrow } from "react-icons/fa";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";

interface ZoomableViewportProps {
  zoom: number;
  setZoom: (zoom: number) => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

const ZoomableViewport: React.FC<ZoomableViewportProps> = ({
  zoom,
  setZoom,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuVisibleList = [25, 50, 75, 100, 125, 150, 175, 200];
  const increaseZoom = () => {
    if (zoom < 200) setZoom(zoom + 25);
  };

  const decreaseZoom = () => {
    if (zoom > 25) setZoom(zoom - 25);
  };

  const handleZoomChange = (value: number) => {
    setZoom(value);
    setMenuVisible(false);
  };

  return (
    <div className={styles.box}>
      <button
        className={styles.scrollButton}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <FaLocationArrow className={styles.locationButton} />
      </button>
      <button className={styles.button} onClick={decreaseZoom}>
        <HiOutlineMinusSm />
      </button>
      <span
        className={styles.chip__zoom}
        onClick={() => setMenuVisible(!menuVisible)}
      >
        {zoom}%
      </span>
      {menuVisible && (
        <ul className={styles.list__zoom}>
          {menuVisibleList.map((value) => (
            <li
              className={styles.list__item__zoom}
              key={value}
              onClick={() => handleZoomChange(value)}
            >
              {value}%
            </li>
          ))}
        </ul>
      )}
      <button className={styles.button} onClick={increaseZoom}>
        <HiOutlinePlusSm />
      </button>
    </div>
  );
};

export default ZoomableViewport;

import React from "react";
import ZoomableViewport from "./ZoomableViewport";
import styles from "../sass/header.module.scss";

interface HeaderProps {
  zoom: number;
  setZoom: (zoom: number) => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

const Header: React.FC<HeaderProps> = ({
  zoom,
  setZoom,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
}) => {
  return (
    <header className={styles.header}>
      <h1>Service</h1>
      <ZoomableViewport
        zoom={zoom}
        setZoom={setZoom}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      />
    </header>
  );
};

export default Header;

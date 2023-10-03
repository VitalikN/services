import React, { useState, useCallback, useRef } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import styles from "../sass/home.module.scss";
import ViewportControlButtons from "@/components/ViewportControlButtons";

const Home: React.FC = () => {
  const [zoom, setZoom] = useState<number>(100);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const isScrolling = useRef(false);

  const handleScroll = useCallback((xIncrement: number, yIncrement: number) => {
    setTranslate((prev) => ({
      x: prev.x + xIncrement,
      y: prev.y + yIncrement,
    }));

    if (isScrolling.current) {
      requestAnimationFrame(() => handleScroll(xIncrement, yIncrement));
    }
  }, []);

  const startScrolling = (xIncrement: number, yIncrement: number) => {
    isScrolling.current = true;
    requestAnimationFrame(() => handleScroll(xIncrement, yIncrement));
  };

  const stopScrolling = () => {
    isScrolling.current = false;
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        zoom={zoom}
        setZoom={setZoom}
        onMouseDown={() => startScrolling(-1, 1)}
        onMouseUp={stopScrolling}
        onMouseLeave={stopScrolling}
      />
      <main className={styles.main}>
        <ViewportControlButtons
          startScrollingUp={() => startScrolling(0, 1)}
          startScrollingRight={() => startScrolling(-1, 0)}
          startScrollingDown={() => startScrolling(0, -1)}
          startScrollingLeft={() => startScrolling(1, 0)}
          stopScrolling={stopScrolling}
        />
        <section
          id="viewportWrapper"
          className={styles.container}
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px)`,
            zoom: `${zoom}%`,
          }}
        >
          <p>Ваш основний контент тут</p>
        </section>
      </main>
    </>
  );
};

export default Home;

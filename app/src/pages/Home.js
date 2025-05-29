import React, { useState, useEffect, useRef } from "react";

const GlitchText = ({ word, spansPerLine, color }) => {
  return (
    <p className={`glitch-line ${color}`}>
      {word.map((char, i) => (
        <span
          key={i}
          className="glitch-letter"
          data-char={char}
          style={{
            letterSpacing: spansPerLine[i] || "normal",
          }}
        >
          {char}
        </span>
      ))}
    </p>
  );
};

const StarLayer = ({ count, size, speed }) => {
  const [stars, setStars] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const initialStars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
    }));

    setStars(initialStars);
  }, [count]);

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      setStars((prevStars) => {
        const width = window.innerWidth;

        return prevStars.map(({ x, y }) => {
          let newX = x - speed;
          if (newX < 0) newX = width;
          return { x: newX, y };
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [speed]);

  const boxShadow = stars
    .map(({ x, y }) => `${x}px ${y}px white`)
    .join(", ");

  const style = {
    width: `${size}px`,
    height: `${size}px`,
    background: "transparent",
    boxShadow,
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 0, 
  };

  return <div ref={containerRef} style={style} />;
};

const Home = () => {
  return (
    <div id="hero" style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      

      <div id="hero-content" style={{ position: "relative", zIndex: 1 }}>
        <GlitchText
          word={["d", "e", "s", "i", "g", "n", "."]}
          spansPerLine={["4rem", "3.8rem", "4rem", "4rem", "4rem", "4rem", "4rem"]}
          color="red"
        />
        <GlitchText
          word={["d", "e", "v", "e", "l", "o", "p", "."]}
          spansPerLine={["4rem", "4rem", "4rem", "1.95rem", "2rem", "2rem", "5.4rem", "4rem"]}
          color="orange"
        />
        <GlitchText
          word={["d", "e", "l", "i", "g", "h", "t", "."]}
          spansPerLine={["4rem", "4rem", "4rem", "4rem", "4rem", "4rem", "4rem", "4rem"]}
          color="yellow"
        />
        <StarLayer count={100} size={1} speed={0.4} />
      <StarLayer count={50} size={2} speed={0.2} />
      </div>
      
    </div>
  );
};

export default Home;

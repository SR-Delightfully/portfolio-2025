import { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FooterBar from "./components/FooterBar";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

const App = () => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cursorUfo, setCursorUfo] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    let animationFrame;
    const maxSpeed = 4;   
    const easing = 0.08;  


    const followUfo = () => {
      setCursorUfo(prev => {
        const dx = cursor.x - prev.x;
        const dy = cursor.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 0.1) return prev; 

        const easedX = prev.x + dx * easing;
        const easedY = prev.y + dy * easing;

        const moveX = easedX - prev.x;
        const moveY = easedY - prev.y;
        const moveDistance = Math.sqrt(moveX * moveX + moveY * moveY);

        if (moveDistance > maxSpeed) {
          return {
            x: prev.x + (moveX / moveDistance) * maxSpeed,
            y: prev.y + (moveY / moveDistance) * maxSpeed,
          };
        } else {
          return { x: easedX, y: easedY };
        }
      });

      animationFrame = requestAnimationFrame(followUfo);
    };

    followUfo();

    return () => cancelAnimationFrame(animationFrame);
  }, [cursor]);

  useEffect(() => {
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleButtonHover = (hovered) => {
    setButtonHovered(hovered);
  };

  return (
    <Router>
        <NavBar />

          <div
          id="cursor"
          style={{
            position: "fixed",
            left: `${cursor.x}px`,
            top: `${cursor.y}px`,
            pointerEvents: "none",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "transparent", 
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          id="cursor-ufo"
          className={isClicking ? "clicking" : ""}
          style={{
            position: "fixed",
            left: `${cursorUfo.x}px`,
            top: `${cursorUfo.y}px`,
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            zIndex: 1001,
          }}
          onMouseEnter={() => handleButtonHover(true)}
          onMouseLeave={() => handleButtonHover(false)}
        >
            
        <div className="light" />
        <div className="light" />
        <div className="light" />
        <div className="light" />
        <div className="light" />
      </div>
      <div id="wrapper">
    

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
        <FooterBar />
    </Router>
  );
};

export default App;

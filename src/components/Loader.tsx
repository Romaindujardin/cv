import React, { useState, useEffect } from "react";
import "./Loader.css";

const Loader: React.FC = () => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "WELCOME";
  const typingSpeed = 150; // Vitesse de frappe en ms
  const cursorBlinkSpeed = 500; // Vitesse de clignotement du curseur

  useEffect(() => {
    // Animation de frappe du texte
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    // Animation de clignotement du curseur
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, cursorBlinkSpeed);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div id="loader">
      <div className="loader-text">
        {displayText}
        <span className={`cursor ${showCursor ? "visible" : "hidden"}`}>|</span>
      </div>
    </div>
  );
};

export default Loader;

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export default function PageTransition({
  phase,
  onClosed,
  onOpened,
  percentageLoaded = 0,
}) {
  const c1 = useAnimation();
  const c2 = useAnimation();
  const c3 = useAnimation();
  const c4 = useAnimation();
  const closeSoundRef = useRef(null);
  const openSoundRef = useRef(null);
  
  const START = {
    outerLeft: "-200%",
    innerLeft: "-300%",
    innerRight: "300%",
    outerRight: "200%",
  };

  useEffect(() => {
    // Load actual sound files
    const closeAudio = new Audio("/sounds/door-close.mp3");
    closeAudio.load();
    closeSoundRef.current = closeAudio;

    // Use the same sound for opening (or you can add a different one)
    const openAudio = new Audio("/sounds/door-close.mp3");
    openAudio.load();
    openSoundRef.current = openAudio;

    return () => {
      // Clean up audio elements
      if (closeAudio) {
        closeAudio.pause();
        closeAudio.src = "";
      }
      if (openAudio) {
        openAudio.pause();
        openAudio.src = "";
      }
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const runClosing = async () => {
      // Play close sound if available
      if (closeSoundRef.current) {
        try {
          await closeSoundRef.current.play();
        } catch (e) {
          // Ignore play errors
          console.warn("Failed to play close sound:", e);
        }
      }
      
      // Set initial positions (doors start off-screen)
      await Promise.all([
        c1.set({ "--dx": START.outerLeft }),
        c2.set({ "--dx": START.innerLeft }),
        c3.set({ "--dx": START.innerRight }),
        c4.set({ "--dx": START.outerRight }),
      ]);
      if (cancelled) return;

      // Animate doors moving inward to close the screen
      await Promise.all([
        c1.start({
          "--dx": "0%",
          transition: { duration: 1.2, ease: "easeInOut" },
        }),
        c4.start({
          "--dx": "0%",
          transition: { duration: 1.2, ease: "easeInOut" },
        }),
        c2.start({
          "--dx": "0%",
          transition: { duration: 1.4, ease: "easeInOut" },
        }),
        c3.start({
          "--dx": "0%",
          transition: { duration: 1.4, ease: "easeInOut" },
        }),
      ]);
      
      // Wait for 1 second when doors are fully closed
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!cancelled) onClosed?.();
    };

    const runOpening = async () => {
      // Play open sound if available
      if (openSoundRef.current) {
        try {
          await openSoundRef.current.play();
        } catch (e) {
          // Ignore play errors
          console.warn("Failed to play open sound:", e);
        }
      }
      
      // Set initial positions (doors are closed/inward)
      await Promise.all([
        c1.set({ "--dx": "0%" }),
        c2.set({ "--dx": "0%" }),
        c3.set({ "--dx": "0%" }),
        c4.set({ "--dx": "0%" }),
      ]);
      if (cancelled) return;

      // Animate doors moving outward to open the screen
      await Promise.all([
        c1.start({
          "--dx": START.outerLeft,
          transition: { duration: 1.4, ease: "easeInOut" },
        }),
        c2.start({
          "--dx": START.innerLeft,
          transition: { duration: 1.2, ease: "easeInOut" },
        }),
        c3.start({
          "--dx": START.innerRight,
          transition: { duration: 1.2, ease: "easeInOut" },
        }),
        c4.start({
          "--dx": START.outerRight,
          transition: { duration: 1.4, ease: "easeInOut" },
        }),
      ]);

      if (!cancelled) onOpened?.();
    };

    if (phase === "closing") runClosing();
    if (phase === "opening") runOpening();

    return () => {
      cancelled = true;
    };
  }, [phase, c1, c2, c3, c4, onClosed, onOpened, START.innerLeft, START.innerRight, START.outerLeft, START.outerRight]);

  if (phase === "idle") return null;

  // Inline styles to replace SCSS module
  const contStyle = {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    zIndex: 9999,
    pointerEvents: "none",
    background: "transparent",
  };

  const doorStyle = {
    position: "fixed",
    top: 0,
    height: "100%",
    minHeight: "100%",
    objectFit: "cover",
    willChange: "transform",
    zIndex: 1000000,
    transform: "translateX(calc(var(--base, 0%) + var(--dx, 0%)))",
  };

  const door1Style = {
    ...doorStyle,
    "--base": "-150%",
    right: "50vw",
    minWidth: "20vw",
    objectPosition: "100% 0",
    zIndex: 20,
  };

  const door2Style = {
    ...doorStyle,
    "--base": "0%",
    right: "calc(50vw - 1px)",
    minWidth: "calc(30vw + 1.5px)",
    objectPosition: "100% 0",
    zIndex: 10,
  };

  const door3Style = {
    ...doorStyle,
    "--base": "0%",
    left: "calc(50vw - 1px)",
    minWidth: "calc(30vw + 1.5px)",
    objectPosition: "0 0",
    zIndex: 10,
  };

  const door4Style = {
    ...doorStyle,
    "--base": "150%",
    left: "50vw",
    minWidth: "20vw",
    objectPosition: "0 0",
    zIndex: 20,
  };

  const loadingTextStyle = {
    opacity: phase === "waiting" ? 1 : 0,
    fontSize: "1.8rem",
    color: "#000",
    backdropFilter: "blur(3px)",
    position: "fixed",
    bottom: "0px",
    right: "0px",
    margin: "3rem",
    padding: "0.6rem 1.2rem",
    border: "3px solid black",
    borderRadius: "18px",
    zIndex: 1000001,
    transition: "opacity 0.3s",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  };

  return (
    <div style={contStyle} aria-hidden>
      <motion.img
        src="/water-flow/newdoors/door1.png"
        alt="Door 1"
        style={door1Style}
        animate={c1}
      />
      <motion.img
        src="/water-flow/newdoors/door2.png"
        alt="Door 2"
        style={door2Style}
        animate={c2}
      />
      <motion.img
        src="/water-flow/newdoors/door3.png"
        alt="Door 3"
        style={door3Style}
        animate={c3}
      />
      <motion.img
        src="/water-flow/newdoors/door4.png"
        alt="Door 4"
        style={door4Style}
        animate={c4}
      />
      
      {/* Loading Text */}
      <div style={loadingTextStyle}>
        Loading: {Math.round(percentageLoaded)}%
      </div>
    </div>
  );
}
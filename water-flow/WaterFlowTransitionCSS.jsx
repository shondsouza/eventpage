import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import "./WaterFlow.css";
import Door1Image from "../../public/images/doors/Door1.png";
import Door2Image from "../../public/images/doors/Door2.png";
import Door3Image from "../../public/images/doors/Door3.png";
import Door4Image from "../../public/images/doors/Door4.png";
import doorCloseSound from "../../public/sounds/door-close.mp3";

export default function WaterFlowTransitionCSS({
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
    const closeAudio = new Audio(doorCloseSound);
    closeAudio.load();
    closeAudio.onerror = (e) => console.warn("Error loading close sound", e);
    closeSoundRef.current = closeAudio;

    const openAudio = new Audio(doorCloseSound);
    openAudio.load();
    openAudio.onerror = (e) => console.warn("Error loading open sound", e);
    openSoundRef.current = openAudio;
  }, []);

  useEffect(() => {
    let cancelled = false;

    const runClosing = async () => {
      closeSoundRef.current?.play();
      await Promise.all([
        c1.set({ "--dx": START.outerLeft }),
        c2.set({ "--dx": START.innerLeft }),
        c3.set({ "--dx": START.innerRight }),
        c4.set({ "--dx": START.outerRight }),
      ]);
      if (cancelled) return;

      await Promise.all([
        c1.start({
          "--dx": "0%",
          transition: { duration: 0.7, ease: "easeInOut" },
        }),
        c4.start({
          "--dx": "0%",
          transition: { duration: 0.7, ease: "easeInOut" },
        }),

        c2.start({
          "--dx": "0%",
          transition: { duration: 0.9, ease: "easeInOut" },
        }),
        c3.start({
          "--dx": "0%",
          transition: { duration: 0.9, ease: "easeInOut" },
        }),
      ]);
      
      if (!cancelled) onClosed?.();
    };

    const runOpening = async () => {
      setTimeout(async () => {
        openSoundRef.current?.play();
        await Promise.all([
          c2.start({
            "--dx": START.innerLeft,
            transition: { duration: 0.7, ease: "easeInOut" },
          }),
          c3.start({
            "--dx": START.innerRight,
            transition: { duration: 0.7, ease: "easeInOut" },
          }),

          c1.start({
            "--dx": START.outerLeft,
            transition: { duration: 0.9, ease: "easeInOut" },
          }),
          c4.start({
            "--dx": START.outerRight,
            transition: { duration: 0.9, ease: "easeInOut" },
          }),
        ]);

        if (!cancelled) onOpened?.();
      }, 500);
    };

    if (phase === "closing") runClosing();
    if (phase === "opening") runOpening();

    return () => {
      cancelled = true;
    };
  }, [phase, c1, c2, c3, c4, onClosed, onOpened]);

  if (phase === "idle") return null;

  return (
    <div className="water-flow-cont" aria-hidden>
      <motion.img
        src={Door1Image}
        alt="Door1"
        className={`water-flow-door water-flow-door1`}
        style={{ "--dx": START.outerLeft }}
        animate={c1}
      />
      <motion.img
        src={Door2Image}
        alt="Door2"
        className={`water-flow-door water-flow-door2`}
        style={{ "--dx": START.innerLeft }}
        animate={c2}
      />
      <motion.img
        src={Door3Image}
        alt="Door3"
        className={`water-flow-door water-flow-door3`}
        style={{ "--dx": START.innerRight }}
        animate={c3}
      />
      <motion.img
        src={Door4Image}
        alt="Door4"
        className={`water-flow-door water-flow-door4`}
        style={{ "--dx": START.outerRight }}
        animate={c4}
      />
      {
        <div
          className={`water-flow-loading-text ${
            phase === "waiting" ? "water-flow-loading-show" : ""
          }`}
        >
          Loading: {Math.round(percentageLoaded)}%
        </div>
      }
    </div>
  );
}
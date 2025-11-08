import React, { useState } from "react";
import { WaterFlowTransition } from "./index";

const WaterFlowExample = () => {
  const [phase, setPhase] = useState("idle");
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  const startClosing = () => {
    setPhase("closing");
  };

  const startOpening = () => {
    setPhase("opening");
  };

  const simulateLoading = () => {
    setPhase("waiting");
    let percentage = 0;
    const interval = setInterval(() => {
      percentage += 1;
      setLoadingPercentage(percentage);
      if (percentage >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setPhase("opening");
        }, 500);
      }
    }, 50);
  };

  const reset = () => {
    setPhase("idle");
    setLoadingPercentage(0);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Water Flow Transition Example</h1>
      
      <WaterFlowTransition
        phase={phase}
        onClosed={() => console.log("Doors closed")}
        onOpened={() => console.log("Doors opened")}
        percentageLoaded={loadingPercentage}
      />
      
      <div style={{ marginTop: "20px", zIndex: 10001, position: "relative" }}>
        <button onClick={startClosing} disabled={phase !== "idle"}>
          Start Closing Animation
        </button>
        <button onClick={simulateLoading} disabled={phase !== "idle"}>
          Simulate Loading
        </button>
        <button onClick={startOpening} disabled={phase !== "waiting"}>
          Start Opening Animation
        </button>
        <button onClick={reset}>Reset</button>
      </div>
      
      <div style={{ marginTop: "20px" }}>
        <p>Current Phase: {phase}</p>
        <p>Loading Percentage: {loadingPercentage}%</p>
      </div>
    </div>
  );
};

export default WaterFlowExample;
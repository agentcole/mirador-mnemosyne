import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";

const AdaSlider = withStyles({
  root: {
    width: 100,
  },
})(Slider);

export const AdaLayerOpacity = ({ windowId, layerOpacity, updateWindow }) => {
  const [opacity, setOpacity] = useState(1);


  const handleChange = (event, newValue) => {
    event.stopPropagation(); // stop event from propagating up to draggable handlers
    setOpacity(newValue);

    // update the canvas opacity
    const canvasElements = document.querySelectorAll(`#${windowId} canvas`);
    canvasElements.forEach((canvas) => {
      canvas.style.opacity = newValue;
    });

    // update the window background opacity
    const backgroundElement = document.querySelector(`#${windowId}`);
    if (backgroundElement) {
      backgroundElement.style.background = `rgba(255, 255, 255, ${newValue})`;
    }
    
    updateWindow(windowId, { adaOpacity: !opacity });
  };

  return (
    <div style={{ paddingLeft: 10 }}>
      <AdaSlider value={opacity} min={0} max={1} step={0.1} onChange={handleChange} />
    </div>
  );
};

AdaLayerOpacity.defaultProps = {
  layerOpacity: 1
}
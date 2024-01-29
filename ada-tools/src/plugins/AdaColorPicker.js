// import React, { useState, useEffect, useRef } from "react";
// import IconButton from "@material-ui/core/IconButton";
// import ColorizeIcon from "@material-ui/icons/Colorize";
// import { SketchPicker } from "react-color";

// export const AdaColorPicker = () => {
//   const [color, setColor] = useState("#fff");
//   const [showPicker, setShowPicker] = useState(false);
//   const pickerRef = useRef(null);

//   useEffect(() => {
//     if (showPicker) {
//       document.body.appendChild(pickerRef.current);
//     }
//     return () => {
//       if (showPicker) {
//         document.body.removeChild(pickerRef.current);
//       }
//     };
//   }, [showPicker]);

//   const handleColorChange = (color) => {
//     setColor(color.hex);
//   };

//   return (
//     <div>
//       <IconButton style={{ backgroundColor: color }} onClick={() => setShowPicker(!showPicker)}>
//         <ColorizeIcon style={{ color: color !== "#fff" ? "#fff" : "inherit" }} />
//       </IconButton>
//       <div ref={pickerRef} style={{ position: "fixed", zIndex: "9999", right: "20px", top: "20px" }}>
//         {showPicker && <SketchPicker color={color} onChange={handleColorChange} />}
//       </div>
//     </div>
//   );
// };

import React from "react";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

export const AdaExtraInfoButton = ({ targetId }) => {
  const handleClick = () => {
    alert("Hello");
  };

  return (
    <IconButton aria-label="extra-button" onClick={handleClick} color="default" size="small">
      <InfoIcon fontSize="inherit" />
    </IconButton>
  );
};

import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TuneSharpIcon from "@material-ui/icons/TuneSharp";

const ExtraButtonMenuItem = ({ enabled, handleClose, t, updateWindow, windowId }) => {
  const handleClickOpen = () => {
    handleClose();
    updateWindow(windowId, { extraButtonEnabled: !enabled });
  };

  return (
    <MenuItem onClick={handleClickOpen}>
      <ListItemIcon>
        <TuneSharpIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ variant: "body1" }}>{enabled ? t("hide") : t("show")}</ListItemText>
    </MenuItem>
  );
};

ExtraButtonMenuItem.propTypes = {
  enabled: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  updateWindow: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

ExtraButtonMenuItem.defaultProps = {
  enabled: true,
};

export default ExtraButtonMenuItem;

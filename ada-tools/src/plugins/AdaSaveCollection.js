import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import {  parseHashParameters } from "./utils";
import { saveCollection } from "../../../mirador-integration-master/src/utils";

export const AdaSaveCollection = ({ windowConfig, exportState }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveCollection = async () => {
    const { config } = exportState;
    
    const keys = Object.keys(localStorage);
    const annotations = keys.map(item => JSON.parse(localStorage.getItem(item)));
    
    try {
      const {id} = parseHashParameters(window.location.hash);
      console.log(id);
      const apiUrl = document.getElementById('demo').dataset.miradorCollectionApi;
      await saveCollection(id, exportState, annotations, apiUrl);
      alert('Saved');
    } catch(e) {
      alert('Error: Could not save collection');
    }
  };

  return (
    <>
      <IconButton aria-label="extra-button" onClick={handleClickOpen}>
        <SaveIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"How To Save Collections"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Place "How To" or readme text here */}
            Information about saving your collection here..
            {/* ... */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSaveCollection} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

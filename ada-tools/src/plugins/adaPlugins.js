import React from "react";
import withTheme from '@material-ui/core/styles/withTheme';
import { AdaExtraInfoButton } from "./AdaExtraInfoButton";
import { AdaColorPicker } from "./AdaColorPicker";

import { AdaLayerOpacity } from "./AdaLayerOpacity";
import { AdaHowToDialog } from "./AdaHowTo";
import { AdaSaveCollection } from "./AdaSaveCollection";

import * as actions from 'mirador/dist/es/src/state/actions';
import { getWindowConfig, getExportableState } from 'mirador/dist/es/src/state/selectors';
import { AdaScreenRecording } from "./AdaScreenRecording";
/**
 * Info for common patterns and targets
 * @link https://projectmirador.github.io/mirador-design/docs/about/02-terminology.html
 */
export default [
  {
    target: "WindowSideBarButtons",
    component: AdaExtraInfoButton,
    mode: "add",
    options: {
      position: "bottom", // position within the WindowSideBarButtons
    },
  },
  // Layer opacity plugin
  {
    target: "WindowTopBarPluginMenu",
    mode: "add",
    component: AdaLayerOpacity,
    options: {
      position: "end", // Position in the top bar
    },
    mapDispatchToProps: {
      updateWindow: actions.updateWindow,
    },
    mapStateToProps: (state, { windowId }) => ({
      layerOpacity: getWindowConfig(state, { windowId }).adaOpacity || 1,
    }),
  },
  // HowTo plugin
  {
    target: "WorkspaceControlPanelButtons",
    mode: "add",
    component: AdaHowToDialog,
    options: {
      position: "bottom", // You can choose 'bottom', 'left', 'right', 'top' based on your requirements
    },
  },
  {
    target: "WorkspaceControlPanelButtons",
    mode: "add",
    component: AdaScreenRecording,
    options: {
      position: "bottom", // You can choose 'bottom', 'left', 'right', 'top' based on your requirements
    },
  },
  // HowTo plugin
  {
    target: "WorkspaceControlPanelButtons",
    mode: "add",
    component: AdaSaveCollection,
    options: {
      position: "bottom", // You can choose 'bottom', 'left', 'right', 'top' based on your requirements
    },
    mapStateToProps: (state, { windowId }) => ({
      windowConfig: getWindowConfig(state, { windowId }) || {},
      exportState: getExportableState(state) || {},
    }),
  },
  // Color picker
  // {
  //   target: "WindowTopBarPluginMenu",
  //   mode: "add",
  //   component: AdaColorPicker,
  //   options: {
  //     position: "end",
  //   },
  // },
];

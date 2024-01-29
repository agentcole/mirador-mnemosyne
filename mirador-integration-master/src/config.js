import LocalStorageAdapter from "../../mirador-annotations-0.5.0/es/LocalStorageAdapter";

export const API_BASE_URL =
  "https://digitalartsarchive.at/?id=169&controller=Collections";

/**
 * Default config for initialization
 */
export const defaultConfig = {
  id: "demo",
  annotation: {
    adapter: (canvasId) =>
      new LocalStorageAdapter(`localStorage://?canvasId=${canvasId}`),
    exportLocalStorageAnnotations: true, // display annotation JSON export button
  },
  window: {
    // Annotation plugins
    // defaultSideBarPanel: "annotations",
    // defaultSideBarPanel: "info",
    // sideBarOpenByDefault: true,
    sideBarOpenByDefault: false,
    // hideSearchPanel: false,
    // hideWindowTitle: true,
    // hideAnnotationsPanel: true,
    allowClose: true,
    allowMaximize: false,
    allowFullscreen: true,
  },
  videoOptions: {
    // Additional props passed to <audio> element
    // controls: true,
    crossOrigin: "anonymous",
  },
  workspace: {
    type: "elastic",
  },
  workspaceControlPanel: {
    enabled: true,
    // enabled: false, // Configure if the control panel should be rendered.  Useful if you want to lock the viewer down to only the configured manifests
  },
};

/**
 * Mirador theme config
 * Sets up a MaterialUI theme. See https://material-ui.com/customization/default-theme/
 * https://github.com/ProjectMirador/mirador/blob/5cb692ed31480c1e130f4a8715726688cb35796d/src/config/settings.js#L35
 */
export const themeConfig = {
  theme: {
    palette: {
      primary: {
        main: "#1967d2",
      },
    },
  },
};

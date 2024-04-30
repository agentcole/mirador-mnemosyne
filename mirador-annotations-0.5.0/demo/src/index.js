/* eslint-disable no-case-declarations */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable sort-keys */
/* eslint-disable comma-dangle */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
// Updated custom mirador dist with video annotations
import mirador from "../../../mirador/dist/es/src/index";
import annotationPlugins from "../../src";
import LocalStorageAdapter from "../../src/LocalStorageAdapter";
import { miradorImageToolsPlugin } from "../../../mirador-image-tools/es/index";
import { AdaPlugins } from "../../../ada-tools/lib";
import { parseHashParameters } from "../../../ada-tools/src/plugins/utils";
import { getCollection } from "../../../mirador-integration-master/src/utils";

export const loadMiradorWorkspaceCollection = async (collectionId) => {
  const {
    workspace, windows, collection, annotations
  } = await getCollection(
    collectionId
  );
  const manifestKeys = Object.keys(workspace.windows);

  loadCustomAnnotations(annotations);
  // TODO: add conditions

  const config = {
    ...defaultConfig,
    // Workspace 'elastic' or 'mosaic'
    workspace: {
      type: workspace.workspace.type || "elastic",
      viewportPosition: workspace.workspace.viewportPosition,
    },
    viewers: workspace.viewers,
    windows: manifestKeys.map((id) => {
      console.info(workspace.viewers[id]);

      return {
        imageToolsEnabled: true,
        imageToolsOpen: false,
        manifestId: workspace.windows[id].manifestId,
        id: workspace.windows[id].id,
        collectionIndex: workspace.windows[id].collectionIndex,
        canvasId: workspace.windows[id].canvasId,
        // thumbnailNavigationPosition: 'far-bottom', // If a video or multiple entries
      };
    }),
    ...themeConfig,
  };

  const miradorInstance = mirador.viewer(config, [
    ...annotationPlugins,
    ...miradorImageToolsPlugin,
    ...AdaPlugins,
  ]);

  updateViewers(workspace, manifestKeys, miradorInstance);
};

export const themeConfig = {
  theme: {
    palette: {
      primary: {
        main: "#1967d2",
      },
    },
  },
};

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

export const loadMiradorManifestHash = (manifestIds) => {};

export const loadMiradorInstance = (config) => {};

// Updating all positions because mirador doesn't work well with elastic view
export const updateViewers = (workspace, manifestKeys, miradorInstance) => {
  manifestKeys.forEach((id) => {
    // Elastic window update
    const elasticWindow = workspace.elasticLayout[id];
    if (elasticWindow) {
      miradorInstance.store.dispatch({
        type: "mirador/UPDATE_ELASTIC_WINDOW_LAYOUT",
        windowId: id,
        payload: {
          x: elasticWindow.x,
          y: elasticWindow.y,
          height: elasticWindow.height,
          width: elasticWindow.width,
        },
      });
    }
    // Zoom Window viewport
    const viewerWindow = workspace.viewers[id];
    console.log("viwer", id, viewerWindow);
    if (viewerWindow) {
      setTimeout(() => {
        miradorInstance.store.dispatch({
          type: "mirador/UPDATE_VIEWPORT",
          windowId: id,
          payload: {
            ...viewerWindow,
          },
        });
      }, 10);
    }
  });
};

export const loadCustomAnnotations = (annotations) => {
  console.log("annotations", annotations);
  // localStorage.clear();
  annotations.forEach((annotation) => {
    localStorage.setItem(annotation.id, JSON.stringify(annotation));
  });
};

function loadManifest(manifestList) {
  console.log(`Loading manifest with list: ${manifestList}`);
  // Load manifest logic here
}

function loadMirador() {
  const params = parseHashParameters(window.location.hash);
  const { mode } = params;

  switch (mode) {
    case 'collection':
      const collectionId = params.id;
      if (collectionId) {
        loadMiradorWorkspaceCollection(collectionId);
      }
      break;
    case 'manifest':
      const manifestList = params.manifests ? params.manifests.split(',') : [];
      loadManifest(manifestList);
      break;
    case 'preview':
      // Handle preview mode
      break;
    case 'share':
      // Handle share mode
      break;
    default:
      console.log('Unknown mode or no mode specified');
  }
}
loadMirador();

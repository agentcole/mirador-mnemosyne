import mirador from "../../mirador/dist/es/src/index";
import annotationPlugins from "../../mirador-annotations-0.5.0/es/index";
import { miradorImageToolsPlugin } from "../../mirador-image-tools/es/index";
import { AdaPlugins } from "../../ada-tools/lib";
import {
  parseHashParameters,
} from "../../ada-tools/src/plugins/utils";
import { defaultConfig, themeConfig } from "./config";
import { getCollection } from "./utils";

export const loadMiradorWorkspaceCollection = async (collectionId) => {
  const apiUrl = document.getElementById("demo").dataset.miradorCollectionApi;
  const { workspace, windows, collection, annotations } = await getCollection(
    collectionId,
    apiUrl
  );
  const manifestKeys = Object.keys(workspace.windows);

  loadCustomAnnotations(annotations);

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
  // localStorage.clear();
  annotations.forEach((annotation) => {
    localStorage.setItem(annotation.id, JSON.stringify(annotation));
  });
};

function loadManifest(manifestList) {
  console.log(`Loading manifest with list: ${manifestList}`);
  // Load manifest logic here

  const miradorInstance = mirador.viewer({
    ...defaultConfig,
    ...{
      workspace: { type: "mosaic" },
      windows: manifestList.map((item) => ({ manifestId: item })),
    },
  });
}

function loadMirador() {
  const params = parseHashParameters(window.location.hash);
  const { mode } = params;

  switch (mode) {
    case "collection":
      const collectionId = params.id;
      if (collectionId) {
        loadMiradorWorkspaceCollection(collectionId);
      }
      break;
    case "manifest":
      const manifestList = params.manifests ? params.manifests.split(",") : [];
      console.log("MANIFESTS", manifestList);
      loadManifest(manifestList);
      break;
    case "preview":
      // Handle preview mode
      break;
    case "share":
      // Handle share mode
      break;
    default:
      console.info("Unknown mode or no mode specified");
  }
}
loadMirador();

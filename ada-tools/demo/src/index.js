import Mirador from "../../../mirador/dist/es/src/index"
import { AdaPlugins } from "../../src";

const config = {
  id: "demo",
  windows: [
    {
      loadedManifest: "https://purl.stanford.edu/sn904cj3429/iiif/manifest",
    },
  ],
};

var miradorInstance = Mirador.viewer(config, [...AdaPlugins]);
